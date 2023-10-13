import { INestApplication, Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import {
  ContactObject,
  InfoObject,
} from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';

export function useSwaggerPlugin(
  app: INestApplication,
  {
    title,
    description,
    version,
    name,
    url,
    email,
  }: Partial<ContactObject & InfoObject>
) {
  const config = new DocumentBuilder()
    .setTitle(title || 'Title')
    .setDescription(description || 'Description')
    .setVersion(version || '0.0.Not-set-beta')
    .setContact(
      name || 'Unkown Name',
      url || 'Unkown URL',
      email || 'Unkown Email'
    )
    .addTag('TODO')
    .build();

  Logger.log(
    "Open api documentation is served through the '/api' route. To get the documentation as JSON use '/api-json' route. ",
    'Swagger'
  );

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
}
