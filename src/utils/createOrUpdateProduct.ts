import { ProductsCollection, ProductType } from 'db/models/product';
import { Offer, SeedResults } from 'interfaces';

interface createOrUpdateProductProps {
  payload: ProductType;
  seedResults: SeedResults;
}

export const createOrUpdateProduct = async ({
  payload,
  seedResults,
}: createOrUpdateProductProps): Promise<SeedResults> => {
  const updatedProduct = await ProductsCollection.findOneAndUpdate(
    { prom_id: payload.prom_id },
    { $set: payload }, // ✅ Обновляет только переданные поля
    { new: true },
  );
  if (updatedProduct) {
    seedResults.updated += 1;
  } else {
    const createdProduct = await ProductsCollection.create(payload);
    if (createdProduct) seedResults.created += 1;
  }

  return seedResults;
};
