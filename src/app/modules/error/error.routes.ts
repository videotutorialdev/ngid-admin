import { Routes } from '@angular/router';
import { ErrorComponent } from './error.component';

export const errorRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/',
  },
  {
    path: '500',
    component: ErrorComponent,
    data: {
      status: 500,
    },
  },
  {
    path: '404',
    component: ErrorComponent,
    data: {
      status: 404,
    },
  },
];
