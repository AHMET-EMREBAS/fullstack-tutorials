import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app/app.module';
import * as helmet from 'helmet';
import { EmailConfig } from './app/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';

  app.use(helmet.default());

  app.setGlobalPrefix(globalPrefix);

  app.enableCors();

  const port = process.env.PORT || 3000;

  const config = new DocumentBuilder()
    .setTitle('API')
    .setVersion('1.0v')
    .addTag('Techbir')
    .addBearerAuth({ type: 'http' }, 'authToken')
    .setContact(EmailConfig.orgName, EmailConfig.website, EmailConfig.infoEmail)
    .build();

  const doc = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, doc);

  await app.listen(port);

  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
