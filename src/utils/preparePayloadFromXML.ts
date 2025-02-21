import { GroupType } from 'db/models/group';
import { ProductType } from 'db/models/product';
import { GroupInXML, OfferInXML } from 'interfaces';

const getGroupName = (id: string, groups: GroupInXML[]) => {
  const group = groups.find((group) => group.$.id === id);
  return group ? group._ : '';
};

const getGroupParentId = (id: string, groups: GroupInXML[]) => {
  const group = groups.find((group) => group.$.id === id);
  if (!group) return 0;
  if (!group.$.parentId) return 0;
  return group.$.parentId;
};

const getMainImage = (images: string | string[]) => {
  if (Array.isArray(images)) {
    return images[0];
  }
  return images;
};

const getImages = (images: string | string[]) => {
  //[{url:string, thumbnail_url:string, id:number},{}...]

  if (!Array.isArray(images))
    return [
      {
        url: images,
        thumbnail_url: '',
        id: 0,
      },
    ];
  if (images.length === 1) {
    return [
      {
        url: images[0],
        thumbnail_url: '',
        id: 0,
      },
    ];
  }
  const additionalImagesArray = images.slice(1);
  const newArray = additionalImagesArray.map((image) => {
    return {
      url: image,
      thumbnail_url: '',
      id: 0,
    };
  });
  return newArray;
};

export const prepareGroupFromXML = (
  id: string,
  groups: GroupInXML[],
): GroupType => {
  const groupName = getGroupName(id, groups);
  const group = {
    id: Number(id),
    name: groupName,
    name_multilang: { ru: groupName },
    // description:,
    // description_multilang {}:,
    // image:,
    parent_group_id: Number(getGroupParentId(id, groups)),
  } as GroupType;
  return group;
};

export const prepareProductFromXML = (
  offer: OfferInXML,
  groups: GroupInXML[],
): ProductType => {
  const groupName = getGroupName(offer.categoryId, groups);

  const product = {
    id: Number(offer.$.id),
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
    group: {
      id: Number(offer.categoryId),
      name: groupName,
      name_multilang: { ru: groupName },
    },
    // category:
    // prices:
    main_image: getMainImage(offer.picture),
    images: getImages(offer.picture),
    // status:
    // quantity_in_stock:
    // measure_unit:
    // is_variation:
    // variation_base_id:
    // variation_group_id:
  } as ProductType;
  return product;
};
