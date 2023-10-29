import { Route } from '@angular/router';
import { authRoutes } from '@techbir/material';

export const appRoutes: Route[] = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  {
    path: 'auth',
    loadChildren: () => authRoutes,
  },
];
