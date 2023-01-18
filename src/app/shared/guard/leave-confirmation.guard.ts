import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';
import { ModalService } from '../components/advanced/modal';
@Injectable({ providedIn: 'root' })
export class LeaveConfirmationGuard implements CanDeactivate<boolean> {
  constructor(private modal: ModalService) {}
  canDeactivate(
    component: any
  ): Observable<boolean> | Promise<boolean> | boolean {
    const formGroup: FormGroup = component && component.formGroup;
    if (
      (component && component.onLeaveConfirmation) ||
      (formGroup && formGroup.dirty && !formGroup.isSubmitted)
    ) {
      return component.onLeaveConfirmation
        ? component.onLeaveConfirmation()
        : new Promise((resolve) => {
            this.modal.leaveConfirmation().subscribe((result: boolean) => {
              resolve(result);
            });
          });
    }
    return true;
  }
}
