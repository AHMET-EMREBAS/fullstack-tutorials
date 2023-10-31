import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@techbir/database';
import { UserController } from './user.controller';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [EventEmitterModule, TypeOrmModule.forFeature([User])],
  controllers: [UserController],
})
export class UserModule {}
