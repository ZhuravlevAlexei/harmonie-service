import { setupServer } from './server';
import { initMongoConnection } from './db/initMongoConnection';
import { TEMP_DIR } from './constants';
import { createDirIfNotExists } from 'utils/createDirIfNotExists';

const bootstrap = async () => {
  await initMongoConnection();
  setupServer();
};

bootstrap();
