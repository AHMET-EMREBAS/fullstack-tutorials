import { Module } from '@nestjs/common';

import { TodoModule } from '@techbir/rest';

import { DatabaseModule } from '@techbir/database';
import { AuthGuard, AuthModule } from '@techbir/core';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [DatabaseModule, TodoModule, AuthModule],
  providers: [{ provide: APP_GUARD, useClass: AuthGuard }],
})
export class AppModule {}
