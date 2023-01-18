import { Routes } from '@angular/router';
import { AccountSettingsComponent } from './account-settings.component';

export const accountSettingsRoutes: Routes = [
  {
    path: '',
    component: AccountSettingsComponent,
    children: [],
  },
];
