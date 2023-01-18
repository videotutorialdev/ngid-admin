import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EmployeeComponent } from './employee.component';
import { employeeRoutes } from './employee.routes';
import { EmployeeService } from './shared/services/employee.service';
import { EmployeeSharedModule } from './shared/shared.module';

@NgModule({
  imports: [EmployeeSharedModule, RouterModule.forChild(employeeRoutes)],
  declarations: [EmployeeComponent],
  providers: [EmployeeService],
})
export class EmployeeModule {}
