import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Permission } from '@techbir/database';
import { PermissionController } from './permission.controller';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [EventEmitterModule, TypeOrmModule.forFeature([Permission])],
  controllers: [PermissionController],
})
export class PermissionModule {}
