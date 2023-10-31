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
import { EventService } from './events/events.service';
import { ScheduleModule } from '@nestjs/schedule';
import { CronsService } from './crons';
import { ServerSideEventsController } from './events';
import { Repository } from 'typeorm';
import {
  Category,
  Department,
  Permission,
  Role,
  User,
} from '@techbir/database';
import { seedAuth, seedCategory } from './seed';
import { EmailEventsService, EmailService } from './email';
import { Config } from './config';

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
  providers: [EventService, CronsService, EmailService, EmailEventsService],
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
    private readonly permissionRepo: Repository<Permission>,
    private readonly emailService: EmailService
  ) {}

  async onModuleInit() {
    await seedAuth(this.userRepo, this.roleRepo, this.permissionRepo);
    await seedCategory(this.departmentRepo, this.categoryRepo);

    await this.emailService.info({
      to: Config.EMAIL_ADDRESS,
      subject: 'Welcome',
      text: 'Thank you fo choosing us. For any assistance, use live chat or send us email throught question@aemrebas.com \n Have an amazing day!',
    });
  }
}
