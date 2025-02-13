import express from 'express';
import cors from 'cors';
import pino from 'pino-http';

import { env } from './utils/env';
import { notFoundHandler } from './middlewares/notFoundHandler';
import { errorHandler } from './middlewares/errorHandler';
import router from 'routers';
import { ctrlWrapper } from 'utils/ctrlWrapper';
import { seedTheBaseController } from 'controllers/goods';

const PORT = Number(env({ name: 'PORT', defaultValue: '3000' }));

export const setupServer = () => {
  const app = express();
  app.use(cors());
  app.use(express.json());

  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.use(router);

  app.use('*', notFoundHandler);
  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
