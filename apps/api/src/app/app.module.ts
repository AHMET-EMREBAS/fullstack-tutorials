import { Module } from '@nestjs/common';

import { TodoModule } from '@techbir/rest';

import { DatabaseModule } from '@techbir/database';

@Module({
  imports: [DatabaseModule, TodoModule],
})
export class AppModule {}
