import express from 'express';

import cors from 'cors';
import pino from 'pino-http';

import router from 'routers';
import { notFoundHandler } from './middlewares/notFoundHandler';
import { errorHandler } from './middlewares/errorHandler';
import { env } from './utils/env';

//эти пути к сертификатам не нужны для деплоя на render.com
// но они нужны для локального тестирования https варианта сервера
// import path from 'node:path';
// import { SERTIFICATES_DIR } from './constants/index';
// import fs from 'fs';
// import https from 'https';

// const PATH_TO_SERT_KEY = path.join(SERTIFICATES_DIR, 'server.key');
// const PATH_TO_SERT_CERT = path.join(SERTIFICATES_DIR, 'server.crt');
// const options = {
//   key: fs.readFileSync(PATH_TO_SERT_KEY),
//   cert: fs.readFileSync(PATH_TO_SERT_CERT),
// };
//конец для локального тестирования https-сервера

const PORT = Number(env('PORT', '3000'));

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

  // // https  server толко для локального тестирования
  // https.createServer(options, app).listen(PORT, () => {
  //   console.log(`Server is running on port ${PORT}`);
  // });

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
