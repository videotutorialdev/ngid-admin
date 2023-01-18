import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeSharedModule } from '../../shared/shared.module';
import { DetailComponent } from './detail.component';

const routes: Routes = [
  {
    path: '',
    component: DetailComponent,
  },
];

@NgModule({
  imports: [EmployeeSharedModule, RouterModule.forChild(routes)],
  declarations: [DetailComponent],
})
export class DetailModule {}
