import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class CronsService {
  @Cron(CronExpression.EVERY_MINUTE)
  every5Second() {
    console.log('Evey 5 second');
  }
}
