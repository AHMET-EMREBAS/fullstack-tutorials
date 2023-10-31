import { Routes } from '@angular/router';
import { provideNavItems } from '../app-layout';

export const AuthRoutes: Routes = [
  {
    title: 'Auth',
    path: '',
    loadComponent: () =>
      import('../app-layout').then((c) => c.AppLayoutComponent),
    providers: [
      provideNavItems([
        { label: 'Go Back', icon: 'arrow_back', route: '../' },
        {
          label: 'Users',
          route: 'users',
          icon: 'manage_accounts',
        },
        {
          label: 'Roles',
          route: 'roles',
          icon: 'shield',
        },
        {
          label: 'Permissions',
          route: 'permissions',
          icon: 'security',
        },
      ]),
    ],
  },
  {
    path: 'users',
    loadChildren: () =>
      import('./users/users.rotues').then((c) => c.UserRoutes),
  },
  {
    path: 'roles',
    loadComponent: () =>
      import('./roles/roles.component').then((c) => c.RolesComponent),
  },
  {
    path: 'permissions',
    loadComponent: () =>
      import('./permissions/permissions.component').then(
        (c) => c.PermissionsComponent
      ),
  },
];
