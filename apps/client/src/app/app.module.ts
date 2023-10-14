import { NgModule, isDevMode } from '@angular/core';

import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { provideApiURL } from './providers/provide-api-url';
import {
  provideAuthInterceptor,
  provideBaseApiURLInterceptor,
} from './providers/provide-http-interceptors';
import { AppStoreModule } from './store/app-store.module';
import { MatProgressSpinner, MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    RouterModule.forRoot(appRoutes, {
      useHash: true,
      initialNavigation: 'enabledBlocking',
    }),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000',
    }),
    AppStoreModule,
  ],
  providers: [
    provideApiURL(),
    provideAuthInterceptor(),
    provideBaseApiURLInterceptor(),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
