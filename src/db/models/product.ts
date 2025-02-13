import { model, Schema, InferSchemaType } from 'mongoose';

import { regionSchema } from './region';

const productSchema = new Schema(
  {
    prom_id: {
      //Унікаьний ідентифікатор товару у базі Prom.ua.
      type: Number,
      required: true,
      //   unique: true,  тут значение только хратится, контроль уникальности будет на базе Прома,
    },
    external_id: {
      //Унікальний ідентифікатор (зовнішньої системи) товару.
      type: String,
    },
    name: {
      //Назва товару.
      type: String,
      required: true,
    },
    name_multilang: {
      //Переклади назви товару.
      type: new Schema(
        {
          ru: {
            type: String,
          },
          uk: {
            type: String,
          },
        },
        { _id: false }, // отключаем создание _id для вложенной схемы
      ),
    },
    sku: {
      //Артикул товару.
      type: String,
    },
    keywords: {
      //Ключові слова товару.
      type: String,
    },
    description: {
      //Опис товару.
      type: String,
    },
    description_multilang: {
      //Переклади опису товару.
      type: new Schema(
        {
          ru: {
            type: String,
          },
          uk: {
            type: String,
          },
        },
        { _id: false },
      ),
    },
    selling_type: {
      //Тип товару.
      type: String,
      enum: ['retail', 'wholesale', 'universal', 'service'],
      default: 'retail',
    },
    presence: {
      //Наявність товару.
      type: String,
      enum: ['available', 'not_available', 'order', 'service'],
      default: 'not_available',
    },
    in_stock: {
      //Статус «На складі».
      type: Boolean,
    },
    regions: [regionSchema],
    price: {
      //Вартість товару.
      type: Number,
    },
    minimum_order_quantity: {
      //Мінімальна кількість товарів в замовленні.
      type: Number,
    },
    discount: {
      //Знижка.
      type: new Schema({
        value: {
          //Встановлене значення знижки.
          type: Number,
        },
        type: {
          //Тип знижки (абсолютне значення/відсоток).
          type: String,
          enum: ['amount', 'percent'],
          default: 'percent',
        },
        date_start: {
          // Дата початку періоду знижок.
          type: Date,
        },
        date_end: {
          //Дата закінчення періоду знижок.
          type: Date,
        },
      }),
    },
    currency: {
      //Валюта товару.
      type: String,
      default: 'UAH',
    },
    group: {
      type: new Schema({
        id: {
          //Ідентифікатор товарної групи.
          type: Number,
        },
        name: {
          //Назва товарної групи.
          type: String,
        },
        name_multilang: {
          //Переклади назви группы
          type: new Schema(
            {
              ru: {
                type: String,
              },
              uk: {
                type: String,
              },
            },
            { _id: false },
          ),
        },
      }),
    },
    category: {
      type: new Schema(
        {
          id: {
            type: Number,
          },
          caption: {
            //Назва категорії.
            type: String,
          },
        },
        { _id: false },
      ),
    },
    prices: [
      //Сітка гуртових цін.
      new Schema({
        price: {
          //Ціна за товар при купівлі понад кількість, що вказана.
          type: Number,
        },
        minimum_order_quantity: {
          //Мінімальна кількість одиниць товару для вказаної вартості.
          type: Number,
        },
      }),
    ],
    main_image: {
      //Посилання на головне зображення товару.
      type: String,
    },
    images: [String], //Додаткові зображення товару.
    status: {
      //Статус товару.
      type: String,
      enum: [
        'on_display',
        'draft',
        'deleted',
        'not_on_display',
        'editing_required',
        'approval_pending',
        'deleted_by_moderator',
      ],
      default: 'not_on_display',
    },
    quantity_in_stock: {
      //Залишок продукту на складі.
      type: Number,
    },
    measure_unit: {
      //Одиниця вимірювання.
      type: String,
    },
    is_variation: {
      //Чи є товар різновидом.
      type: Boolean,
    },
    variation_base_id: {
      // Ідентифікатор базового товару
      type: Number,
    },
    variation_group_id: {
      //Ідентифікатор групи різновидів.
      type: Number,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export type ProductType = InferSchemaType<typeof productSchema>;

export const ProductsCollection = model('products', productSchema);
