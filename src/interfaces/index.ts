export interface OperationResults {
  createdProducts: number;
  updatedProducts: number;
  createdGroups: number;
  updatedGroups: number;
  message: string;
}

export interface GroupInXML {
  $: {
    id: string;
    parentId?: string; // Может отсутствовать у корневых категорий
  };
  _: string; // Название категории (текстовое содержимое тега)
}

export interface GroupsInXML {
  //   category: Category[] | Category; // Может быть массивом или одиночным объектом
  category: GroupInXML[];
}

export interface OfferInXML {
  $: { id: string; available: string }; // Атрибуты
  url: string;
  price: string;
  currencyId: string;
  categoryId: string;
  picture: string | string[]; // Несколько картинок
  name: string;
  name_ua: string;
  vendor: string;
  country_of_origin?: string;
  description?: string;
  description_ua?: string;
  keywords?: string;
  keywords_ua?: string;
  sales_notes?: string;
  param?: { $: { name: string }; _: string }[]; // Параметры товара
}

export interface OffersInXML {
  //   offer: Offer[] | Offer; // Может быть массивом или объектом
  offer: OfferInXML[];
}

export interface ShopInXML {
  offers: OffersInXML;
}

export interface YmlCatalogInXML {
  yml_catalog: {
    shop: ShopInXML;
  };
}
