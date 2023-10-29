import {
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
export const BASE_API_URL = 'BASE_API_URL';
@Injectable()
export class BaseUrlInterceptor implements HttpInterceptor {
  constructor(@Inject(BASE_API_URL) private baseUrl: string) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const newURL = `${this.baseUrl}/${request.url}`;

    const headers = request.headers;
    new HttpHeaders({ ...headers });

    const apiReq = request.clone({ url: newURL, headers });

    return next.handle(apiReq);
  }
}
