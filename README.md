# Integration between apps and libraries

1. Observation

   - 1.1 Run the following comands

     ```
         npx nx serve api

         npx nx serve client
     ```

   - 1.2 Open nx.json and study the configurations
   - 1.3 Open apps/client/project.json and study configurations
   - 1.4 Open apps/client/proxy.conf.json and study configurations
   - 1.5 Open apps/api/project.json and study configurations
   - 1.6 Open libs/common and study README.md and project.json file
   - 1.6 Open libs/core and study README.md and project.json file
   - 1.6 Open libs/utils and study README.md and project.json file
   - 1.6 Open libs/material and study README.md and project.json file

2. This is the minimal structure of the development environement.

   - 2.1 Study frontend and backend application files.
   - 2.2 Makes changes and observe changes.
   - 2.3 It is not that complex, do not focus on details.

### WIKI HOW

1. How to add angular material to project

```
pnpm add @angular/material

npx nx g @angular/material:ng-add --project=client

```

2.  How to add PWA to project

```
pnpm add @angular/pwa

npx nx g @angular/pwa:ng-add --project=client
```

3. How to configure server to accept Request
   - 3.1 Make sure API application is updated as follows

```
/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // This allows requests from different origin
  app.enableCors({ origin: '*' });

  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  const port = process.env.PORT || 3000;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();

```

- 3.2 Make sure the prox.conf.json under client application folder is configured like this

```

{
  "/api": {
    "target": "http://localhost:3000",
    "secure": false
  }
}
```

and

make sure you introduced the configuration in the project.json

```
  "serve": {
      "executor": "@angular-devkit/build-angular:dev-server",
      "configurations": {
        "production": {
          "browserTarget": "client:build:production"
        },
        "development": {
          "browserTarget": "client:build:development"
        }
      },
      "defaultConfiguration": "development",
      "options": {
        "proxyConfig": "apps/client/proxy.conf.json"
      }
    },
```

I know it seems like a bit complex but it is not! You just need sometime to get used to the environment.

Do not focus on details much right now. Just enjoy your running application!

You will learn more about configurations during the course. 


