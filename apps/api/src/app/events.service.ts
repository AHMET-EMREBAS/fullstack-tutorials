import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { SSE } from './sse.controller';

@Injectable()
export class EventService {
  @OnEvent('role.save')
  onSave(args: any) {
    console.log('Saved', args);
    SSE.next(args);
  }
}
