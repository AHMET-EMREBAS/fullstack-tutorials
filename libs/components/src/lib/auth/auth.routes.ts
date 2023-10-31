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
        {
          label: 'Users',
          route: 'manage-user',
          icon: 'manage_accounts',
        },
        {
          label: 'Roles',
          route: 'roles',
          icon: 'shield',
        },
      ]),
    ],

    children: [
      {
        path: '',
        loadComponent: () =>
          import('./auth.component').then((c) => c.AuthComponent),
        children: [
          {
            title: 'Manage User',
            path: 'manage-user',
            loadComponent: () =>
              import('./manage-user/manage-user.component').then(
                (c) => c.ManageUserComponent
              ),
          },
        ],
      },
    ],
  },
];
