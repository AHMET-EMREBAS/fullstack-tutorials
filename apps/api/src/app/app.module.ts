import { Module, OnModuleInit } from '@nestjs/common';
import { InjectRepository, TypeOrmModule } from '@nestjs/typeorm';
import {
  CategoryModule,
  DepartmentModule,
  PermissionModule,
  RoleModule,
  UserModule,
} from '@techbir/rest';

import { EventEmitterModule } from '@nestjs/event-emitter';
import { EventService } from './events.service';
import { ScheduleModule } from '@nestjs/schedule';
import { CronsService } from './crons.service';
import { ServerSideEventsController } from './sse.controller';
import { Repository } from 'typeorm';
import {
  Category,
  Department,
  Permission,
  Role,
  User,
} from '@techbir/database';
import { seedAuth } from './seed/seed-auth';
import { seedCategory } from './seed';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    EventEmitterModule.forRoot({
      delimiter: '.',
    }),
    TypeOrmModule.forRoot({
      type: 'better-sqlite3',
      database: './tmp/database.sqlite',
      autoLoadEntities: true,
      synchronize: true,
      dropSchema: true,
    }),
    TypeOrmModule.forFeature([User, Role, Permission, Category, Department]),
    UserModule,
    RoleModule,
    PermissionModule,
    CategoryModule,
    DepartmentModule,
  ],
  controllers: [ServerSideEventsController],
  providers: [EventService, CronsService],
})
export class AppModule implements OnModuleInit {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepo: Repository<Category>,
    @InjectRepository(Department)
    private readonly departmentRepo: Repository<Department>,
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    @InjectRepository(Role) private readonly roleRepo: Repository<Role>,
    @InjectRepository(Permission)
    private readonly permissionRepo: Repository<Permission>
  ) {}

  onModuleInit() {
    seedAuth(this.userRepo, this.roleRepo, this.permissionRepo);
    seedCategory(this.departmentRepo, this.categoryRepo);
  }
}
