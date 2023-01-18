import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseModule } from 'src/app/core/base/base-module';
import { EmployeeDTO } from '../../shared/dtos/employee.dto';
import { EmployeeModel } from '../../shared/models/employee.model';
import { EmployeeService } from '../../shared/services/employee.service';

@Component({
  templateUrl: './detail.component.html',
})
export class DetailComponent extends BaseModule {
  public employee: EmployeeModel;
  private _id: string;
  constructor(
    private _service: EmployeeService,
    private _route: ActivatedRoute
  ) {
    super('module.admin.module.employee.module.detail');
  }

  protected onInit(): void {
    this.setStateInitialization();
    this.setStateId();
    this.setStateEmployee();
    this.setStateReady();
  }

  private setStateInitialization(): void {
    this.employee = EmployeeModel.createEmpty();
  }

  private setStateId(): void {
    this._id = this._route.snapshot.queryParams.id;
    if (!this._id) this.router.navigate(['/admin/employee']);
  }

  private setStateEmployee(): void {
    this._service.getById(this._id).subscribe({
      next: (dto: EmployeeDTO) => {
        this.employee = EmployeeModel.create(dto);
      },
      error: (errorResponse) => {
        console.log(errorResponse);
      },
    });
  }

  public handleBack(): void {
    this.router.navigate(['/admin/employee']);
  }
}
