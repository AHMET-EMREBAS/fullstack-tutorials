import { Module, OnModuleInit } from '@nestjs/common';
import { InjectRepository, TypeOrmModule } from '@nestjs/typeorm';
import { CategoryModule, DepartmentModule } from '@techbir/rest';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { EventService } from './events/events.service';
import { ScheduleModule } from '@nestjs/schedule';
import { CronsService } from './crons';
import { ServerSideEventsController } from './events';
import { Repository } from 'typeorm';
import { Category, Department } from '@techbir/database';
import { seedAuth, seedCategory } from './seed';
import { EmailConfig, JwtConfig, UserConfig } from './config';
import {
  AuthModule,
  EmailModule,
  EmailService,
  Permission,
  Role,
  User,
} from '@techbir/core';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    EventEmitterModule.forRoot({
      delimiter: '.',
    }),

    JwtModule.register({ ...JwtConfig }),
    EmailModule.register({ ...EmailConfig }),

    TypeOrmModule.forRoot({
      type: 'better-sqlite3',
      database: './tmp/database.sqlite',
      autoLoadEntities: true,
      synchronize: true,
      dropSchema: true,
    }),
    TypeOrmModule.forFeature([User, Role, Permission, Category, Department]),

    AuthModule,
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
    private readonly permissionRepo: Repository<Permission>,
    private readonly emailService: EmailService
  ) {}

  async onModuleInit() {
    await seedAuth(this.userRepo, this.roleRepo, this.permissionRepo);
    await seedCategory(this.departmentRepo, this.categoryRepo);

    await this.emailService.info({
      to: UserConfig.ROOT_USERNAME,
      subject: 'Welcome',
      text: 'Thank you fo choosing us. For any assistance, use live chat or send us email throught question@aemrebas.com \n Have an amazing day!',
    });
  }
}
