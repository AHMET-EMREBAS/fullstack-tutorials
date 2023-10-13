import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todo } from './models';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'better-sqlite3',
      database: './tmp/database/main.sqlite',
      entities: [Todo],
      // This options will DELETE all data in database and recreate each time the application start
      // So, this is not be here under production!
      synchronize: true,
      dropSchema: true,
    }),
  ],
})
export class DatabaseModule {}
