import { bootstrapApplication } from '@angular/platform-browser';

import { AppComponent } from './app/app.component';
import { isDevMode } from '@angular/core';
import {
  provideRouter,
  withEnabledBlockingInitialNavigation,
  withHashLocation,
  withRouterConfig,
} from '@angular/router';
import { provideServiceWorker } from '@angular/service-worker';
import { provideAnimations } from '@angular/platform-browser/animations';
import { appRoutes } from './app/app.routes';
import { provideStore } from '@ngrx/store';
import { provideEntityData } from '@ngrx/data';
import { provideEffects } from '@ngrx/effects';
import { HTTP_INTERCEPTORS, provideHttpClient } from '@angular/common/http';

import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpEvent,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class CoreInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const nreq = req.clone({
      url: 'http://localhost:3000',
      headers: req.headers.set(
        'Bearer',
        localStorage.getItem('access-token') ||
          'User does not have access-token!'
      ),
    });
    return next.handle(nreq);
  }
}

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideStore(),
    provideEffects(),
    provideEntityData({}),
    provideAnimations(),

    provideRouter(
      appRoutes,
      withEnabledBlockingInitialNavigation(),
      withHashLocation(),
      withRouterConfig({ onSameUrlNavigation: 'reload' })
    ),
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000',
    }),

    {
      multi: true,
      provide: HTTP_INTERCEPTORS,
      useClass: CoreInterceptor,
    },
  ],
}).catch((err) => console.error(err));
