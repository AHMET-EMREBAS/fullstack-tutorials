import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
export const BASE_API_URL = 'BASE_API_URL'
@Injectable()
export class BaseUrlInterceptor implements HttpInterceptor {
  constructor(@Inject(BASE_API_URL) private baseUrl: string) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const newURL = `${this.baseUrl}/${request.url}`;
    console.log(newURL, '<< NEW URL');
    const apiReq = request.clone({ url: newURL });
    return next.handle(apiReq);
  }
}
