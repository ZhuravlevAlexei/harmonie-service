import { GroupsCollection, GroupType } from 'db/models/group';
import { ProductsCollection, ProductType } from 'db/models/product';
import { ProductDataType, ProductsDataCollection } from 'db/models/productData';
import { OperationResults } from 'interfaces';

interface createOrUpdateProductProps {
  payload: ProductType;
  operationResults: OperationResults;
}

export const createOrUpdateProduct = async ({
  payload,
  operationResults,
}: createOrUpdateProductProps): Promise<OperationResults> => {
  const updatedProduct = await ProductsCollection.findOneAndUpdate(
    { id: payload.id },
    { $set: payload }, // ✅ Обновляет только переданные поля
    { new: true },
  );
  if (updatedProduct) {
    operationResults.updatedProducts += 1;
  } else {
    const createdProduct = await ProductsCollection.create(payload);
    if (createdProduct) operationResults.createdProducts += 1;
  }

  return operationResults;
};

interface createOrUpdateProductDataProps {
  payload: ProductDataType;
  operationResults: OperationResults;
}

export const createOrUpdateProductData = async ({
  payload,
  operationResults,
}: createOrUpdateProductDataProps): Promise<OperationResults> => {
  const updatedProduct = await ProductsDataCollection.findOneAndUpdate(
    { id: payload.id },
    { $set: payload }, // ✅ Обновляет только переданные поля
    { new: true },
  );
  if (updatedProduct) {
    operationResults.updatedProducts += 1;
  } else {
    const createdProduct = await ProductsDataCollection.create(payload);
    if (createdProduct) operationResults.createdProducts += 1;
  }

  return operationResults;
};

interface createOrUpdateGroupProps {
  payload: GroupType;
  operationResults: OperationResults;
}

export const createOrUpdateGroup = async ({
  payload,
  operationResults,
}: createOrUpdateGroupProps): Promise<OperationResults> => {
  const updatedGroup = await GroupsCollection.findOneAndUpdate(
    { id: payload.id },
    { $set: payload }, // ✅ Обновляет только переданные поля
    { new: true },
  );

  if (updatedGroup) {
    operationResults.updatedGroups += 1;
  } else {
    const createdGroup = await GroupsCollection.create(payload);
    if (createdGroup) operationResults.createdGroups += 1;
  }

  return operationResults;
};
