/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { INestApplication, Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express/adapters';
import { createServer } from 'https';

import express = require('express');
import { readFileSync } from 'fs';
import { join } from 'path';
import * as helmet from 'helmet';
export type ServerPlugin = (app: INestApplication) => void;

export type BootstrapOptions = {
  appModule: any;
  port: number;
  plugins: ServerPlugin[];
};

export async function bootstrap({
  appModule,
  port,
  plugins,
}: BootstrapOptions) {
  const server = express();

  const HTTPS_SERVER = createServer(
    {
      key: readFileSync(join(__dirname, 'ssl/key.pem')),
      cert: readFileSync(join(__dirname, 'ssl/cert.pem')),
    },
    server
  );

  const app = await NestFactory.create(appModule, new ExpressAdapter(server));

  app.use(helmet.default());
  app.enableCors({ origin: '*' });

  const globalPrefix = 'api';

  app.setGlobalPrefix(globalPrefix);

  for (const plugin of plugins) plugin(app);

  await app.init();

  HTTPS_SERVER.listen(port, () =>
    Logger.log(`Https server is up and running at port ${port}`, 'Bootstrap')
  );
}
