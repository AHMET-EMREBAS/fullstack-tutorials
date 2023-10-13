import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todo } from '@techbir/database';
import { TodoController } from './todo.controller';


@Module({
  imports: [TypeOrmModule.forFeature([Todo])],
  controllers: [TodoController],
})
export class TodoModule {}
