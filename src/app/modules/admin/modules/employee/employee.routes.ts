import { Routes } from '@angular/router';
import { EmployeeComponent } from './employee.component';

export const employeeRoutes: Routes = [
  {
    path: '',
    component: EmployeeComponent,
  },
  {
    path: 'add-edit',
    loadChildren: () =>
      import('./modules/add-edit/add-edit.module').then((m) => m.AddEditModule),
  },
  {
    path: 'detail',
    loadChildren: () =>
      import('./modules/detail/detail.module').then((m) => m.DetailModule),
  },
];
