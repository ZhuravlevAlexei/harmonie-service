import { InferSchemaType, model, Schema } from 'mongoose';

export const groupSchema = new Schema(
  {
    id: {
      type: Number,
      //Унікальний ідентифікатор групи.
    },
    name: {
      //Назва групи.
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
    description: {
      type: String,
    },
    description_multilang: {
      //Переклади опису групи.
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
    image: {
      //URL-адреса зображення групи.
      type: String,
    },
    parent_group_id: {
      //Ідентифікатор батьківської групи.
      type: Number,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export type GroupType = InferSchemaType<typeof groupSchema>;

export const GroupsCollection = model('groups', groupSchema);
