import { Route } from '@angular/router';
import { provideNavItems } from '@techbir/components';

export const appRoutes: Route[] = [
  {
    title: 'Welcome',
    path: '',
    loadComponent: () =>
      import('@techbir/components').then((c) => c.AppLayoutComponent),

    providers: [
      provideNavItems([
        {
          label: 'Auth',
          route: 'auth',
          icon: 'security',
        },
      ]),
    ],
  },

  {
    path: 'auth',
    loadChildren: () => import('@techbir/components').then((m) => m.AuthRoutes),
  },
];
