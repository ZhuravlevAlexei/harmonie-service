import express from 'express';
import https from 'https';
import cors from 'cors';
import pino from 'pino-http';
import fs from 'fs';
import path from 'node:path';

import { env } from './utils/env';
import { notFoundHandler } from './middlewares/notFoundHandler';
import { errorHandler } from './middlewares/errorHandler';
import router from 'routers';
import { SERTIFICATES_DIR } from './constants/index';

const PORT = Number(env({ name: 'PORT', defaultValue: '3000' }));
const PATH_TO_SERT_KEY = path.join(SERTIFICATES_DIR, 'server.key');
const PATH_TO_SERT_CERT = path.join(SERTIFICATES_DIR, 'server.crt');
const options = {
  key: fs.readFileSync(PATH_TO_SERT_KEY),
  cert: fs.readFileSync(PATH_TO_SERT_CERT),
};

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

  // https  server
  https.createServer(options, app).listen(PORT, () => {
    console.log(`Server is running on  https://localhost:${PORT}`);
  });
};
