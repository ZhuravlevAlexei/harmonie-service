import { ProductDataType } from 'db/models/productData';
import { OfferInXML } from 'interfaces';

const getPictures = (offer: OfferInXML) => {
  if (typeof offer.picture === 'string') {
    return [{ url: offer.picture }];
  } else if (Array.isArray(offer.picture)) {
    return offer.picture?.map((p) => ({ url: p }));
  } else {
    return [];
  }
};

const getParams = (offer: OfferInXML) => {
  if (Array.isArray(offer.param)) {
    return offer.param?.map((p) => ({ name: p.$.name, value: p._ }));
  } else if (typeof offer.param === 'object') {
    const { $, _ } = offer.param;
    const parName = $['name'];
    return [{ name: parName, value: _ }];
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
