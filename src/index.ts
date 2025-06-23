import 'tsconfig-paths/register';
import { setupServer } from './server';
import { initMongoConnection } from './db/initMongoConnection';

const bootstrap = async () => {
  await initMongoConnection();
  setupServer();
};

bootstrap();
