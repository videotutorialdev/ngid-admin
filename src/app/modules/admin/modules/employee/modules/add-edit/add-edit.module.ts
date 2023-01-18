import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LeaveConfirmationGuard } from 'src/app/shared/guard';
import { EmployeeSharedModule } from '../../shared/shared.module';
import { AddEditComponent } from './add-edit.component';

const routes: Routes = [
  {
    path: '',
    component: AddEditComponent,
    canDeactivate: [LeaveConfirmationGuard],
  },
];

@NgModule({
  imports: [EmployeeSharedModule, RouterModule.forChild(routes)],
  declarations: [AddEditComponent],
})
export class AddEditModule {}
