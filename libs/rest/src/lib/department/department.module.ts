import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Department } from '@techbir/database';
import { DepartmentController } from './department.controller';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [EventEmitterModule, TypeOrmModule.forFeature([Department])],
  controllers: [DepartmentController],
})
export class DepartmentModule {}
