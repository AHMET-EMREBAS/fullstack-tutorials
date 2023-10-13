import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthTokenManager } from './auth-token-manager';

@Injectable()
export class AuthTokenInterceptor implements HttpInterceptor {
  public intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const authToken = AuthTokenManager.getToken();

    const newRequest = request.clone({
      headers: request.headers.set(
        'Authorization',
        `Bearer ${authToken?.toString()}`
      ),
    });

    return next.handle(newRequest);
  }
}
