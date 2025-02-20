import fs from 'fs';
import path from 'node:path';
import {
  createOrUpdateGroup,
  createOrUpdateProduct,
} from 'utils/createOrUpdate';
import { parseStringPromise } from 'xml2js';
import { GroupInXML, Offer, OperationResults } from 'interfaces';
import { TEMP_DIR } from '../constants';
import {
  prepareGroupFromXML,
  prepareProductFromXML,
} from 'utils/preparePayloadFromXML';
import { getGroups, getProducts } from './promAPI';

// эта функция заполняет базу из xml-файла. Данные не полные, только для крайнего
// случая или тестирования
export const seedTheBaseService = async (): Promise<OperationResults> => {
  const seedResults: OperationResults = {
    createdProducts: 0,
    updatedProducts: 0,
    createdGroups: 0,
    updatedGroups: 0,
    message: '',
  };

  try {
    // open file and parse
    const PATH_TO_SEED_FILE = path.join(TEMP_DIR, 'products_seed_run.xml');
    const xmlData = fs.readFileSync(PATH_TO_SEED_FILE, 'utf8');
    const result = await parseStringPromise(xmlData, { explicitArray: false });
    const offersArray: Offer[] = result.yml_catalog.shop.offers.offer || [];
    const groupsInXMLArray: GroupInXML[] =
      result.yml_catalog.shop.categories.category || [];
    // console.log('groupsInXMLArray array: ', groupsInXMLArray);
    // console.log('offers array: ', offersArray);
    if (!offersArray.length) {
      console.log('No offers in XML.');
      return {
        ...seedResults,
        message: 'No offers in XML.',
      };
    }
    for (const group of groupsInXMLArray) {
      console.log('group: id: ', group.$.id, 'name: ', group._);
      // create new or update found group (by categoryId from xml)
      const groupPayload = prepareGroupFromXML(group.$.id, groupsInXMLArray);
      // console.log('groupPayload: ', groupPayload);
      await createOrUpdateGroup({
        payload: groupPayload,
        operationResults: seedResults,
      });
    }
    // console.log('first offer: ', offersArray[0]);
    // offersArray.map((offer) => { });  // не работает с await/async!! только в цикле 'for of'
    for (const offer of offersArray) {
      console.log('offer: id: ', offer.$.id, 'name: ', offer.name);

      // create new or update found products in db
      const productPayload = prepareProductFromXML(offer, groupsInXMLArray);
      await createOrUpdateProduct({
        payload: productPayload,
        operationResults: seedResults,
      });
    }
    const nowTime = new Date().toISOString().split('.')[0];
    const resMessage = `Successfully seeded the base! Time: ${nowTime}. Created:  products - ${seedResults.createdProducts}, groups - ${seedResults.createdGroups}. Updated: products - ${seedResults.updatedProducts}, groups - ${seedResults.updatedGroups}.`;
    console.log(resMessage);
    seedResults.message = resMessage;
  } catch (e) {
    console.log('Error while seeding the base', e);
    return { ...seedResults, message: 'Error processing XML' };
  }

  return seedResults;
};

// обновление/заполнение базы штатными средствами через API Prom
export const updateTheBaseService = async (
  pastDateISO: string,
): Promise<OperationResults> => {
  const updateResults: OperationResults = {
    createdProducts: 0,
    updatedProducts: 0,
    createdGroups: 0,
    updatedGroups: 0,
    message: '',
  };

  try {
    // Обновление более 100 групп или товаров (ниже)
    // API Prom выдает в ответе не более 100 групп или товаров
    // поэтому приходится в цикле проверять сколько элементов
    // выдал API в прошлую итерацию. И если меньше 100, то выходим
    // из цикла, значит все группы или товары получили.
    // Для получения следующей порции элементов нужно указывать
    // в запросе last_id - это id последнего элемента полученного
    // в прошлой итерации
    // Итак группы
    let getMoreGroups = true;
    let lastGroupId: number = 0;
    while (getMoreGroups) {
      const data = await getGroups(pastDateISO, lastGroupId);
      // console.log('data: ', data);
      const groups = data.groups;
      let itrG: number = 0;
      for (const group of groups) {
        itrG += 1;
        lastGroupId = group.id;
        console.log('(', itrG, ') group: ', group.id, ' ', group.name);
        // create new or update found group
        await createOrUpdateGroup({
          payload: group,
          operationResults: updateResults,
        });
      }
      if (itrG < 100) getMoreGroups = false;
    }

    //Товары
    let getMoreProducts = true;
    let lastProductId: number = 0;
    while (getMoreProducts) {
      const productsData = await getProducts(
        pastDateISO,
        lastProductId,
        // group.id, //в API Prom, если не указывать группу, то выдает все товары в каталоге
      );
      const products = productsData.products;
      let itrP = 0;
      for (const product of products) {
        itrP += 1;
        lastProductId = product.id;
        console.log('', itrP, ' product: ', product.id, ' ', product.name);
        await createOrUpdateProduct({
          payload: product,
          operationResults: updateResults,
        });
      }
      if (itrP < 100) getMoreProducts = false;
    }
    const nowTime = new Date().toISOString().split('.')[0];
    const resMessage = `Successfully updated the base! Time: ${nowTime}. Created:  products - ${updateResults.createdProducts}, groups - ${updateResults.createdGroups}. Updated: products - ${updateResults.updatedProducts}, groups - ${updateResults.updatedGroups}.`;
    console.log(resMessage);
    updateResults.message = resMessage;
  } catch (error) {
    console.log('error: ', error);
  }

  return updateResults;
};
