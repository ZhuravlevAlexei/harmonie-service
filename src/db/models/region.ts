import { Schema } from 'mongoose';

export const regionSchema = new Schema(
  {
    //Де знаходиться товар.
    id: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    name_multilang: {
      //Переклади назви регіону.
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
  },
  { _id: false }, // если не нужно отдельное _id для каждого элемента массива
);
