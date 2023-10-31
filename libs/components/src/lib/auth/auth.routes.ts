import { Routes } from '@angular/router';

export const AuthRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./auth.component').then((c) => c.AuthComponent),
  },
];
