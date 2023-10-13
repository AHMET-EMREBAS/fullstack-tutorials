import {
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory,
} from '@ngrx/data';
import { TodoDto } from '@techbir/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthTokenInterceptor implements HttpInterceptor {
  public intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const headers = new HttpHeaders();

    const authToken = localStorage.getItem('authToken');

    const newRequest = request.clone({
      headers: request.headers.set('Authorization', `Bearer ${authToken}`),
    });

    console.log(headers);

    console.log('Intercepting ............');
    return next.handle(newRequest);
  }
}

@Injectable({ providedIn: 'root' })
export class TodoService extends EntityCollectionServiceBase<TodoDto> {
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('Todo', serviceElementsFactory);
  }
}
