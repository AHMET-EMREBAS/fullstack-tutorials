import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthTokenManager } from './auth-token-manager';

/**
 * When user logins, we store the authentication token to Browser's localStorage.
 * For each http request, we should send that token to the server as Authorization header.
 * This interceptor intercepts each Http request and add the Authorization header, if any, to our request.
 */
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
        `Bearer ${authToken?.authToken}`
      ),
    });

    return next.handle(newRequest);
  }
}
