import { Route } from '@angular/router';
import { HelloWorldComponent, ByeWorldComponent } from '@techbir/material';
export const appRoutes: Route[] = [
  { path: '', title: 'Home', redirectTo: 'hello', pathMatch: 'full' },
  {
    path: 'hello',
    component: HelloWorldComponent,
    title: 'Hello Page',
  },
  {
    path: 'bye',
    component: ByeWorldComponent,
    title: 'Bye Page',
  },
];
