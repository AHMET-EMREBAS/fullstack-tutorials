import { DynamicModule, Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from './user';
import { Role } from './role';
import { Permission } from './permission';

@Module({})
export class DatabaseModule {
  static register(options: TypeOrmModuleOptions): DynamicModule {
    return {
      module: DatabaseModule,
      imports: [
        TypeOrmModule.forRoot({
          ...options,
          entities: [User, Role, Permission],
        }),
      ],
    };
  }
}
