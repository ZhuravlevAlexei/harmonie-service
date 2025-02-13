import { setupServer } from './server';
import { initMongoConnection } from './db/initMongoConnection';
import { TEMP_DIR } from './constants';
import { createDirIfNotExists } from 'utils/createDirIfNotExists';

const bootstrap = async () => {
  await initMongoConnection();
  await createDirIfNotExists(TEMP_DIR);
  setupServer();
};

bootstrap();
