import { bootstrap, ServerPlugin, useSwaggerPlugin } from '@techbir/core';
import { AppModule } from './app/app.module';
import { INestApplication } from '@nestjs/common';

/**
 * Configure swagger for the project
 * @param app AppModule
 */
const swaggerPlugin: ServerPlugin = (app: INestApplication) => {
  useSwaggerPlugin(app, {
    name: 'Todo Application',
    version: '0.0.1',
    title: 'Todo Api',
    description: 'Manage todo data',
    contact: {
      name: 'A. Emrebas',
      email: 'job@aemrebas.com',
      url: 'https://aemrebas.com',
    },

    email: 'info@aemrebas.com',
  });
};

bootstrap({
  appModule: AppModule,
  port: 3000,
  plugins: [swaggerPlugin],
});
