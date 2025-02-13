export interface SeedResults {
  created: number;
  updated: number;
  message: string;
}

export interface Category {
  $: {
    id: string;
    parentId?: string; // Может отсутствовать у корневых категорий
  };
  _: string; // Название категории (текстовое содержимое тега)
}

export interface Categories {
  //   category: Category[] | Category; // Может быть массивом или одиночным объектом
  category: Category[];
}

export interface Offer {
  $: { id: string; available: string }; // Атрибуты
  url: string;
  price: string;
  currencyId: string;
  categoryId: string;
  picture: string[]; // Несколько картинок
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

export interface Offers {
  //   offer: Offer[] | Offer; // Может быть массивом или объектом
  offer: Offer[];
}

export interface Shop {
  offers: Offers;
}

export interface YmlCatalog {
  yml_catalog: {
    shop: Shop;
  };
}
