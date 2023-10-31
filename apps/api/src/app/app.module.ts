import { Module, OnModuleInit } from '@nestjs/common';
import { InjectRepository, TypeOrmModule } from '@nestjs/typeorm';
import { CategoryModule, DepartmentModule } from '@techbir/rest';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { EventService } from './events/events.service';
import { ScheduleModule } from '@nestjs/schedule';
import { CronsService } from './crons';
import { ServerSideEventsController } from './events';
import { EmailConfig, JwtConfig, DatabaseConfig } from './config';
import { AuthModule, EmailModule, Permission, Role, User } from '@techbir/core';
import { JwtModule } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { Category, Department } from '@techbir/database';
import { seedAuth, seedCategory } from './seed';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    EventEmitterModule.forRoot({
      delimiter: '.',
    }),
    JwtModule.register({ ...JwtConfig }),
    EmailModule.register({ ...EmailConfig }),
    TypeOrmModule.forRoot({ ...DatabaseConfig }),
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
    @InjectRepository(Role) private readonly roleRepo: Repository<Role>,
    @InjectRepository(Permission)
    private readonly permissionRepo: Repository<Permission>,
    @InjectRepository(User) private readonly userRepo: Repository<User>
  ) {}

  onModuleInit() {
    seedCategory(this.departmentRepo, this.categoryRepo);
    seedAuth(this.userRepo, this.roleRepo, this.permissionRepo);
  }
}
