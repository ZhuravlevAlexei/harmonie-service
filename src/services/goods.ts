import fs from 'fs';
import path from 'node:path';
import { createOrUpdateProduct } from 'utils/createOrUpdateProduct';
import { parseStringPromise } from 'xml2js';
import { Category, Offer, SeedResults } from 'interfaces';
import { TEMP_DIR } from '../constants';
import { prepareProductFromXML } from 'utils/prepareProductFromXML';
import { ProductsCollection } from 'db/models/product';

export const seedTheBaseService = async (): Promise<SeedResults> => {
  let seedResults: SeedResults = {
    created: 0,
    updated: 0,
    message: '',
  };

  try {
    // open file and parse
    const PATH_TO_SEED_FILE = path.join(TEMP_DIR, 'products_seed.xml');
    const xmlData = fs.readFileSync(PATH_TO_SEED_FILE, 'utf8');
    const result = await parseStringPromise(xmlData, { explicitArray: false });
    const offersArray: Offer[] = result.yml_catalog.shop.offers.offer || [];
    const categoriesArray: Category[] =
      result.yml_catalog.shop.categories.category || [];
    // console.log('categories array: ', categoriesArray);
    // console.log('offers array: ', offersArray);
    if (!offersArray.length) {
      return {
        ...seedResults,
        message: 'No offers in XML.',
      };
    }
    // console.log('first offer: ', offersArray[0]);
    // offersArray.map((offer) => {
    for (const offer of offersArray) {
      console.log('offer: prom_id: ', offer.$.id, 'name: ', offer.name);
      const payload = prepareProductFromXML(offer, categoriesArray);
      // save new or update found products to db
      await createOrUpdateProduct({ payload, seedResults });
    }
    // });
  } catch (e) {
    console.log('Error while seeding the base', e);
    return { ...seedResults, message: 'Error processing XML' };
  }

  return seedResults;
};
