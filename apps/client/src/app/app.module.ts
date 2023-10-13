import { NgModule, isDevMode } from '@angular/core';

import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavigationComponent } from './navigation/navigation.component';
import { AngularMaterialModule } from './app-material.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { EntityDataModule } from '@ngrx/data';
import { entityConfig } from './entity-metadata';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  declarations: [AppComponent, NavigationComponent],
  imports: [
    BrowserAnimationsModule,
    AngularMaterialModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes, { initialNavigation: 'enabledBlocking' }),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000',
    }),
    StoreModule.forRoot({}, {}),
    EffectsModule.forRoot([]),
    EntityDataModule.forRoot(entityConfig),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
