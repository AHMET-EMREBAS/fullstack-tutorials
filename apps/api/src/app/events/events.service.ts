import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class EventService {
  @OnEvent('app.hello')
  hello() {
    console.log('Hello');
  }
}
