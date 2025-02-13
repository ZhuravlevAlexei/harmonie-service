import { ProductType } from 'db/models/product';
import { Category, Offer } from 'interfaces';

const getCategoryName = (id: string, categories: Category[]) => {
  const category = categories.find((category) => category.$.id === id);
  return category ? category._ : '';
};

export const prepareProductFromXML = (
  offer: Offer,
  categories: Category[],
): ProductType => {
  const product = {
    prom_id: Number(offer.$.id),
    //   product.external_id:
    name: offer.name,
    name_multilang: { ru: offer.name, uk: offer.name_ua },
    // sku:
    keywords: offer.keywords,
    description: offer.description,
    description_multilang: {
      ru: offer.description,
      uk: offer.description_ua,
    },
    // selling_type:
    // presence:
    // in_stock:
    // regions:
    price: Number(offer.price),
    // minimum_order_quantity:
    // discount:
    currency: offer.currencyId,
    // group:
    category: {
      id: Number(offer.categoryId),
      caption: getCategoryName(offer.categoryId, categories),
    },
    // prices:
    // main_image:
    // images:
    // status:
    // quantity_in_stock:
    // measure_unit:
    // is_variation:
    // variation_base_id:
    // variation_group_id:
  } as ProductType;
  return product;
};
