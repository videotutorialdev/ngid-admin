import { Routes } from '@angular/router';
import { AuthComponent } from './auth.component';

export const authRoutes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'sign-in',
      },
      {
        path: 'sign-in',
        loadChildren: () =>
          import('./modules/sign-in/sing-in.module').then(
            (m) => m.SignInModule
          ),
      },
    ],
  },
];
