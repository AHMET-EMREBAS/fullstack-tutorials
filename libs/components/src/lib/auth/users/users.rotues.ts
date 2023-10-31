import { Routes } from '@angular/router';
import { provideNavItems } from '../../app-layout';

export const UserRoutes: Routes = [
  {
    title: 'Manage Users',
    path: '',
    loadComponent: () =>
      import('../../app-layout/app-layout.component').then(
        (c) => c.AppLayoutComponent
      ),

    providers: [
      provideNavItems([
        { label: 'Back', icon: 'arrow_back', route: '../' },
        { label: 'New User', route: 'new-user', icon: 'person_add' },
        { label: 'View Users', route: './', icon: 'group' },
      ]),
    ],

    children: [
      {
        title: 'View Users',
        path: '',
        loadComponent: () =>
          import('./view-users/view-users.component').then(
            (c) => c.ViewUsersComponent
          ),
      },
      {
        title: 'New User',
        path: 'new-user',
        loadComponent: () =>
          import('./new-user/new-user.component').then(
            (c) => c.NewUserComponent
          ),
      },
    ],
  },
];
