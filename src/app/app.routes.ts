import { Routes } from '@angular/router';
import {
  EnsureAuthenticatedGuard,
  EnsureNotAuthenticatedGuard,
} from './shared/guard';

export const appRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'admin',
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./modules/admin/admin.module').then((m) => m.AdminModule),
    canActivateChild: [EnsureAuthenticatedGuard],
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./modules/auth/auth.module').then((m) => m.AuthModule),
    canActivateChild: [EnsureNotAuthenticatedGuard],
  },
  {
    path: 'error',
    loadChildren: () =>
      import('./modules/error/error.module').then((m) => m.ErrorModule),
  },
  {
    path: '**',
    redirectTo: '/error/404',
  },
];
