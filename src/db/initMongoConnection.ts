import mongoose from 'mongoose';

import { env } from '../utils/env';

export const initMongoConnection = async (): Promise<void> => {
  try {
    const user = env({ name: 'MONGODB_USER' });
    const pwd = env({ name: 'MONGODB_PASSWORD' });
    const url = env({ name: 'MONGODB_URL' });
    const db = env({ name: 'MONGODB_DB' });

    await mongoose.connect(
      `mongodb+srv://${user}:${pwd}@${url}/${db}?retryWrites=true&w=majority`,
    );
    console.log('Mongo connection successfully established!');
  } catch (e) {
    console.log('Error while setting up mongo connection', e);
    throw e;
  }
};
