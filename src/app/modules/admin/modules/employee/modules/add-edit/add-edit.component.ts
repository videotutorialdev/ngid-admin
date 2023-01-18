import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseModule } from 'src/app/core/base/base-module';
import { Validators } from 'src/app/shared/validators';
import { v4 } from 'uuid';
import { EmployeeDTO } from '../../shared/dtos/employee.dto';
import { GroupModel, StatusModel } from '../../shared/models';
import { EmployeeModel } from '../../shared/models/employee.model';
import { EmployeeService } from '../../shared/services/employee.service';

@Component({
  templateUrl: './add-edit.component.html',
})
export class AddEditComponent extends BaseModule {
  public id: string;
  public statuses: Array<StatusModel>;
  public groups: Array<GroupModel>;
  public currentDate: string | null;
  constructor(
    private _route: ActivatedRoute,
    private _service: EmployeeService,
    private _datePipe: DatePipe
  ) {
    super('module.admin.module.employee.module.add-edit');
  }

  protected onInit(): void {
    this.setStateInitialization();
    this.buildFormGroup();
    this.getEmployee();
  }

  private setStateInitialization(): void {
    this.id = this._route.snapshot.queryParams.id;
    this.statuses = StatusModel.createList();
    this.groups = GroupModel.createList();
    this.currentDate = this._datePipe.transform(new Date(), 'yyyy-MM-dd');
  }

  private buildFormGroup(): void {
    this.formGroup = this.formBuilder.group({
      id: [this.id || v4()],
      username: [
        null,
        Validators.required('app.form.validation.required.username'),
      ],
      firstName: [
        null,
        Validators.required(
          `${this.moduleCode}.form.validation.required.firstName`
        ),
      ],
      lastName: [
        null,
        Validators.required(
          `${this.moduleCode}.form.validation.required.lastName`
        ),
      ],
      email: [
        null,
        Validators.compose([
          Validators.required(`app.form.validation.required.email`),
          Validators.email(),
        ]),
      ],
      birthDate: [
        null,
        Validators.required(
          `${this.moduleCode}.form.validation.required.birthDate`
        ),
      ],
      basicSalary: [
        null,
        Validators.required(
          `${this.moduleCode}.form.validation.required.basicSalary`
        ),
      ],
      status: [
        null,
        Validators.required(
          `${this.moduleCode}.form.validation.required.status`
        ),
      ],
      group: [
        null,
        Validators.required(
          `${this.moduleCode}.form.validation.required.group`
        ),
      ],
      description: [
        null,
        Validators.required(
          `${this.moduleCode}.form.validation.required.description`
        ),
      ],
      createdAt: [new Date().toJSON()],
    });
  }

  private getEmployee(): void {
    if (this.id) {
      this._service.getById(this.id).subscribe({
        next: (dto: EmployeeDTO) => {
          const { birthDate, ...model } = EmployeeModel.create(dto);
          this.formGroup.patchValue({
            ...model,
            birthDate: birthDate
              ? this._datePipe.transform(birthDate, 'yyyy-MM-dd')
              : null,
          });
          this.setStateReady();
        },
        error: (errorResponse) => {
          this.globalService.toastService.showError(
            `${this.moduleCode}.toast.error.getEmployee`
          );
          this.logger.error(errorResponse);
          this.setStateReady();
        },
      });
    } else {
      this.setStateReady();
    }
  }

  public handleBack(): void {
    this.router.navigate(['/admin/employee']);
  }

  public handleSave(): void {
    this.validate();
    if (this.formGroup.valid && !this.formGroup.disabled) {
      const model = this.formGroup.value;
      const dto = EmployeeDTO.create(model);
      this.globalService.modalService
        .saveConfirmation()
        .subscribe((confirm) => {
          if (confirm) {
            this.setStateProcessing();
            this.validateEmployee(dto);
          }
        });
    }
  }

  /**
   * validateEmployee
   * for support validate employee when using json-server,
   * then we have to get it manualy ("one by one")
   * But this is not best practice for user validation with real api/project
   * @param dto
   */
  private validateEmployee(dto: EmployeeDTO): void {
    this._service.getByUsername(dto.username).subscribe({
      next: (user) => {
        if (user) {
          this.setStateReady();
          this.formGroup.get('username')?.setErrors({
            message: `app.form.validation.exists.username`,
          });
        } else {
          this._service.getByEmail(dto.email).subscribe({
            next: (user) => {
              if (user) {
                this.setStateReady();
                this.formGroup.get('email')?.setErrors({
                  message: `app.form.validation.exists.email`,
                });
              } else {
                this.id ? this.updateEmployee(dto) : this.saveEmployee(dto);
              }
            },
            error: (responseError: HttpErrorResponse) => {
              this.showSaveError(responseError);
            },
          });
        }
      },
      error: (responseError: HttpErrorResponse) => {
        this.showSaveError(responseError);
      },
    });
  }

  private saveEmployee(dto: EmployeeDTO): void {
    this._service.save(dto).subscribe({
      next: () => {
        this.globalService.toastService.showSuccess(
          `${this.moduleCode}.toast.success.save`
        );
        this.router.navigate(['/admin/employee']);
        this.setStateReady();
      },
      error: (responseError: HttpErrorResponse) => {
        this.showSaveError(responseError);
      },
    });
  }

  private showSaveError(responseError: HttpErrorResponse): void {
    this.setStateReady();
    this.logger.error(responseError);
    this.globalService.toastService.showError(
      `${this.moduleCode}.toast.error.save`
    );
  }

  private updateEmployee(dto: EmployeeDTO): void {
    this._service.update(this.id, dto).subscribe({
      next: () => {
        this.globalService.toastService.showSuccess(
          `${this.moduleCode}.toast.success.update`,
          {
            variant: 'WARNING',
          }
        );
        this.router.navigate(['/admin/employee']);
        this.setStateReady();
      },
      error: (responseError: HttpErrorResponse) => {
        this.logger.error(responseError);
        this.globalService.toastService.showError(
          `${this.moduleCode}.toast.error.update`
        );
        this.setStateReady();
      },
    });
  }
}
