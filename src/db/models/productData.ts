import { InferSchemaType, model, Schema } from 'mongoose';

export const productDataSchema = new Schema(
  {
    id: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    images: [{ type: String }],
    params: [{ name: String, value: String }],
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export type ProductDataType = InferSchemaType<typeof productDataSchema>;

export const ProductsDataCollection = model(
  'productsdata',
  productDataSchema,
  'productsdata',
);
