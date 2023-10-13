import { Route } from '@angular/router';
import { TodoComponent } from './todo/todo.component';
import { AuthGuard, authRoutes } from '@techbir/material';

export const appRoutes: Route[] = [
  {
    title: $localize`Todo Application`,
    path: 'todo',
    component: TodoComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'auth',
    loadChildren: () => authRoutes,
  },
];
