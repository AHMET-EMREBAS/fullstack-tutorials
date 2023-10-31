import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryModule, DepartmentModule } from '@techbir/rest';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { EventService } from './events/events.service';
import { ScheduleModule } from '@nestjs/schedule';
import { CronsService } from './crons';
import { ServerSideEventsController } from './events';
import { EmailConfig, JwtConfig } from './config';
import { AuthModule, EmailModule } from '@techbir/core';
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
    AuthModule,
    CategoryModule,
    DepartmentModule,
  ],
  controllers: [ServerSideEventsController],
  providers: [EventService, CronsService],
})
export class AppModule {}
