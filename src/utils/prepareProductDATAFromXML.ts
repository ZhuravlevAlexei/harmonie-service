import { ProductDataType } from 'db/models/productData';
import { OfferInXML } from 'interfaces';

const getPictures = (offer: OfferInXML) => {
  if (typeof offer.picture === 'string') {
    return [offer.picture as string];
  } else if (Array.isArray(offer.picture)) {
    return offer.picture?.map((p) => p as string);
  } else {
    return [];
  }
};

const getParams = (offer: OfferInXML) => {
  if (Array.isArray(offer.param)) {
    return offer.param?.map((p) => ({ name: p.$.name, value: p._ }));
  } else if (typeof offer.param === 'object') {
    const { $, _ } = offer.param;
    return [{ name: $['name'], value: _ }];
  } else {
    return [];
  }
};

export const prepareProductDATAFromXML = (
  offer: OfferInXML,
): ProductDataType => {
  const productData = {
    id: Number(offer.$['id']),
    name: offer.name,
    images: getPictures(offer),
    params: getParams(offer),
  } as ProductDataType;
  return productData;
};
