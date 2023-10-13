/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { INestApplication, Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

export type ServerPlugin = (app: INestApplication) => void

export type BootstrapOptions = {
  /**
   * Application Module
   */
  appModule: any;

  /**
   * Application serving port
   */
  port: number;

  plugins: ServerPlugin[];
};

export async function bootstrap({
  appModule,
  port,
  plugins,
}: BootstrapOptions) {
  const app = await NestFactory.create(appModule);

  app.enableCors({ origin: '*' });

  const globalPrefix = 'api';

  app.setGlobalPrefix(globalPrefix);

  for (const plugin of plugins) plugin(app);

  await app.listen(port);

  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}
