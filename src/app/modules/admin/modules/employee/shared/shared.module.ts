import { NgModule } from '@angular/core';
import { AdminSharedModule } from '../../../shared/shared.module';

@NgModule({
  imports: [AdminSharedModule],
  exports: [AdminSharedModule],
})
export class EmployeeSharedModule {}
