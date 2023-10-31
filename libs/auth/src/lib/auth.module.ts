import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { v4 } from 'uuid';
import { AuthGuard, PermissionGuard } from './guards';
import { Permission, Role, User } from '@techbir/database';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([User, Role, Permission]),
    JwtModule.register({
      secret: process.env['SECRET'] || v4(),
      signOptions: {
        expiresIn: '30d',
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthGuard, PermissionGuard],
  exports: [AuthService, AuthGuard, PermissionGuard],
})
export class AuthModule {}
