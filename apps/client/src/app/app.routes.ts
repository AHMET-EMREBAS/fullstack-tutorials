import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('@techbir/components').then((c) => c.AppLayoutComponent),

    children: [
      {
        path: '',
        loadChildren: () =>
          import('@techbir/components').then((m) => m.AuthRoutes),
      },
    ],
  },
];
