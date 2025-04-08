export interface OperationResults {
  createdProducts: number;
  updatedProducts: number;
  createdGroups: number;
  updatedGroups: number;
  message: string;
}

export interface OfferInXML {
  $: { id: string; available: string };
  url: string;
  price: string;
  currencyId: string;
  categoryId: string;
  picture: string | string[];
  name: string;
  name_ua: string;
  vendor: string;
  country_of_origin?: string;
  description?: string;
  description_ua?: string;
  keywords?: string;
  keywords_ua?: string;
  sales_notes?: string;
  param?: { $: { name: string }; _: string }[];
}
