import { GroupType } from 'db/models/group';
import httpClient from '../utils/httpClient';
import { ProductType } from 'db/models/product';

interface GroupsResponse {
  groups: GroupType[];
}

export const getGroups = async (
  pastDateISO: string,
  lastId: number = 0,
): Promise<GroupsResponse> => {
  try {
    const currentData = new Date();
    const currentDateISO = currentData.toISOString().split('.')[0];
    //my.prom.ua/api/v1/groups/list?last_modified_from=2015-04-28T12%3A50%3A34&last_modified_to=2025-02-19T07%3A00%3A00&limit=100&last_id
    const requestString = `/groups/list?last_modified_from=${pastDateISO}&last_modified_to=${currentDateISO}&limit=100${
      lastId ? `&last_id=${lastId}` : ''
    }`;
    console.log('requestString: ', requestString);

    const response = await httpClient.get(requestString);
    return response.data;
  } catch (error) {
    console.error('Ошибка при запросе на группы:', error);
    throw new Error('Не удалось получить данные по группам ');
  }
};

interface ProductsResponse {
  products: ProductType[];
}

export const getProducts = async (
  pastDateISO: string,
  lastId: number = 0,
  groupId: number = 0,
): Promise<ProductsResponse> => {
  try {
    const currentData = new Date();
    const currentDateISO = currentData.toISOString().split('.')[0];
    //https://my.prom.ua/api/v1/products/list?last_modified_from=2024-02-19T12%3A50%3A34&last_modified_to=2025-02-19T12%3A50%3A34&limit=5000&group_id=12236685&last_id=
    const requestString = `/products/list?last_modified_from=${pastDateISO}&last_modified_to=${currentDateISO}&limit=100${
      lastId ? `&last_id=${lastId}` : ''
    }${groupId ? `&group_id=${groupId}` : ''}`;
    console.log('requestString: ', requestString);
    const response = await httpClient.get(requestString);
    return response.data;
  } catch (error) {
    console.error('Ошибка при запросе на товары:', error);
    throw new Error('Не удалось получить данные по товарам ');
  }
};
