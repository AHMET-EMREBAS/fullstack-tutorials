import { Routes } from '@angular/router';

export const authRoutes: Routes = [
  {
    title: 'Login',
    path: 'login',
    loadComponent: () => import('./login').then((c) => c.LoginComponent),
  },
  {
    title: 'Manage Users',
    path: 'user-management',
    loadComponent: () =>
      import('./user-management').then((c) => c.UserManagementComponent),
  },
];
