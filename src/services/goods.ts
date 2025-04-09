import fs from 'fs';
import path from 'path';
import { parseStringPromise } from 'xml2js';
import {
  createOrUpdateGroup,
  createOrUpdateProduct,
  createOrUpdateProductData,
} from 'utils/createOrUpdate';
import { OfferInXML, OperationResults } from 'interfaces';
import { getGroups, getProducts } from './promAPI';
import { downloadPromXML } from 'utils/downloadPromXML';
import { env } from 'utils/env';
import { DOWNLOADS_DIR } from 'constants/index';
import { prepareProductDATAFromXML } from 'utils/prepareProductDATAFromXML';

// import { HiddenGroups } from '../constants/index';

// штатное обновление/заполнение базы штатными средствами через API Prom
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
    let counterGroups = 0;
    let lastGroupId: number = 0;
    while (getMoreGroups) {
      const data = await getGroups(pastDateISO, lastGroupId);
      // console.log('data: ', data);
      const groups = data.groups;
      let itrG: number = 0;
      for (const group of groups) {
        itrG += 1;
        counterGroups += 1;
        lastGroupId = Number(group.id);
        console.log(
          '(',
          counterGroups,
          '/',
          itrG,
          ') group: ',
          group.id,
          ' ',
          group.name,
        );
        // if (HiddenGroups.includes(Number(group.id))) continue;
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
    let counterProducts = 0;
    let lastProductId: number = 0;
    while (getMoreProducts) {
      const productsData = await getProducts(
        pastDateISO,
        lastProductId,
        // group.id, //в API Prom, если не указывать группу, то выдает все товары в
        //  каталоге по 100 штук в запросе см. выше
      );
      const products = productsData.products;
      let itrP = 0;
      for (const product of products) {
        itrP += 1;
        counterProducts += 1;
        lastProductId = product.id;
        console.log(
          '',
          counterProducts,
          '/',
          itrP,
          ' product: ',
          product.id,
          ' ',
          product.name,
        );
        // if (HiddenGroups.includes(Number(product.group?.id))) continue;
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

export const updateTheProductsDataService =
  async (): Promise<OperationResults> => {
    const updateResults: OperationResults = {
      createdProducts: 0,
      updatedProducts: 0,
      createdGroups: 0,
      updatedGroups: 0,
      message: '',
    };

    const xmlUrl = env('PROM_XML_URL');
    const saveDirectory = DOWNLOADS_DIR;

    try {
      const savedPath = await downloadPromXML(xmlUrl, saveDirectory);
      console.log('Файл успешно сохранён в:', savedPath);
    } catch (error) {
      console.log('error: ', error);
    }

    try {
      // open file and parse
      const PATH_TO_FEED_FILE = path.join(DOWNLOADS_DIR, 'products_feed.xml');
      const xmlData = fs.readFileSync(PATH_TO_FEED_FILE, 'utf8');
      const result = await parseStringPromise(xmlData, {
        explicitArray: false,
      });

      const offersArray: OfferInXML[] =
        result.yml_catalog.shop.offers.offer || [];
      if (!offersArray.length) {
        console.log('No offers in XML.');
        return {
          ...updateResults,
          message: 'No offers in XML.',
        };
      }

      // console.log('offers array: ', offersArray);
      // console.log('first offer: ', offersArray[0]);
      //  // offersArray.map((offer) => { });  // не работает с await/async!! только в цикле 'for of'
      let itr = 0;
      for (const offer of offersArray) {
        itr += 1;
        console.log(itr, ' offer: id: ', offer.$.id, 'name: ', offer.name);
        const productDATAPayload = prepareProductDATAFromXML(offer);

        await createOrUpdateProductData({
          payload: productDATAPayload,
          operationResults: updateResults,
        });
      }
      const nowTime = new Date().toISOString().split('.')[0];
      const resMessage = `Successfully updated products DATA! Time: ${nowTime}. Created DATA in products  - ${updateResults.createdProducts}. Updated DATA in products- ${updateResults.updatedProducts}.`;
      console.log(resMessage);
      updateResults.message = resMessage;
    } catch (error) {
      console.log('error: ', error);
    }

    return updateResults;
  };
