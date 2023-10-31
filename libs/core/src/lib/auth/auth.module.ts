import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { User, UserController } from './user';
import { Role, RoleController } from './role';
import { Permission, PermissionController } from './permission';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmailModule, EmailService } from '../email';
import { AuthGuard } from './guards';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Role, Permission]),
    EventEmitterModule,
    EmailModule,
  ],
  controllers: [
    AuthController,
    UserController,
    RoleController,
    PermissionController,
  ],
  providers: [AuthService, AuthGuard, EmailService],
  exports: [AuthService, AuthGuard],
})
export class AuthModule {}
