import { Controller, Sse } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BehaviorSubject, interval, map, switchMap, tap } from 'rxjs';

export const SSE = new BehaviorSubject({});

@ApiTags('SseController')
@Controller('sse')
export class ServerSideEventsController {
  @Sse()
  hello() {
    return interval(10000).pipe(
      switchMap(() => {
        return SSE;
      }),
      map((data) => ({ data }))
    );
  }
}
