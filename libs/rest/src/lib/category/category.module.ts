import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from '@techbir/database';
import { CategoryController } from './category.controller';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [EventEmitterModule, TypeOrmModule.forFeature([Category])],
  controllers: [CategoryController],
})
export class CategoryModule {}
