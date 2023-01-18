import { Component } from '@angular/core';
import { BaseModule } from 'src/app/core/base/base-module';
import { TableModel } from 'src/app/shared/components/advanced/table';
import { StatusModel } from './shared/models';
import { EmployeeModel } from './shared/models/employee.model';
import { EmployeeService } from './shared/services/employee.service';

@Component({
  templateUrl: './employee.component.html',
})
export class EmployeeComponent extends BaseModule {
  public tableModel: TableModel<EmployeeModel>;
  public statuses: Array<StatusModel>;
  constructor(private _service: EmployeeService) {
    super('module.admin.module.employee');
  }

  protected onInit(): void {
    this.setStateInitialization();
    this.buildFormGroup();
    this.buildTable();
    this.restoreTableFilter();
    this.setStateReady();
  }

  private setStateInitialization(): void {
    this.statuses = StatusModel.createList();
  }

  private buildFormGroup(): void {
    this.formGroup = this.formBuilder.group({
      group: [null],
      status: [null],
    });
  }

  private buildTable(): void {
    this.tableModel = new TableModel(this.moduleCode, [
      {
        field: 'username',
        header: 'username',
      },
      {
        field: 'first_name',
        header: 'firstName',
      },
      {
        field: 'last_name',
        header: 'lastName',
      },
      {
        field: 'email',
        header: 'email',
      },
      {
        field: 'birth_date',
        header: 'birthDate',
        type: 'date',
      },
      {
        field: 'basic_salary',
        header: 'basicSalary',
        type: 'currency',
      },
      {
        field: 'status',
        header: 'status',
      },
      {
        field: 'group',
        header: 'group',
      },
      {
        field: 'description',
        header: 'description',
      },
    ]);
  }

  private restoreTableFilter(): void {
    const customData = localStorage.getItem(this.moduleCode);
    if (!customData) return;
    const { keywords, ...props } = JSON.parse(customData);
    this.formGroup.patchValue(props);
    this.tableModel.setCustomData(props);
    this.tableModel.setKeywords(keywords);
    localStorage.removeItem(this.moduleCode);
  }

  public handleAdd(): void {
    this.router.navigate(['/admin/employee/add-edit']);
  }

  public handleReset(): void {
    this.formGroup.reset();
    this.tableModel.setCustomData({});
    this.tableModel.reload();
  }

  public handleFilter(): void {
    this.tableModel.setCustomData(this.formGroup.value);
    this.tableModel.reload();
  }

  public handleView(record: EmployeeModel): void {
    const customData = this.formGroup.value;
    customData.keywords = this.tableModel.keywords;
    localStorage.setItem(this.moduleCode, JSON.stringify(customData));
    this.router.navigate(['/admin/employee/detail'], {
      queryParams: {
        id: record.id,
      },
    });
  }

  public handleEdit(record: EmployeeModel): void {
    this.router.navigate(['/admin/employee/add-edit'], {
      queryParams: {
        id: record.id,
      },
    });
  }

  public handleDelete(record: EmployeeModel): void {
    this.globalService.modalService
      .deleteConfirmation()
      .subscribe((isConfirm) => {
        if (isConfirm) {
          this._service.deleteById(record.id).subscribe({
            next: () => {
              this.globalService.toastService.showSuccess(
                `${this.moduleCode}.toast.success.delete`,
                {
                  variant: 'DANGER',
                }
              );
              this.tableModel.reload();
            },
            error: (responseError) => {
              this.logger.error(responseError);
              this.globalService.toastService.showSuccess(
                `${this.moduleCode}.toast.success.delete`
              );
            },
          });
        }
      });
  }
}
