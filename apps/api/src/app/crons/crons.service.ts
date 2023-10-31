import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class CronsService {
  @Cron(CronExpression.EVERY_MINUTE)
  everyMinute() {
    console.log('Evey Minute');
  }
}
