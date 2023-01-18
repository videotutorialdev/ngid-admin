import { Injectable, Type } from '@angular/core';
import {
  NgbModal,
  NgbModalOptions,
  NgbModalRef,
} from '@ng-bootstrap/ng-bootstrap';
import { from, Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
@Injectable()
export class PopupService {
  private modal: NgbModalRef;
  constructor(public ngbModal: NgbModal) {}
  public open(
    component: Type<any>,
    componentInstance?: object,
    options?: NgbModalOptions
  ): Observable<any> {
    // modal options as default options
    const modalOptions: NgbModalOptions = {
      backdrop: 'static',
      centered: true,
      size: 'lg',
      keyboard: false,
    };
    const modal = this.ngbModal.open(component, {
      ...modalOptions,
      ...(options || {}),
    });

    this.modal = modal;

    // assign component instance to modal instance
    Object.assign(modal.componentInstance, componentInstance || {});

    // listen close modal from component
    if (modal.componentInstance.onDismiss) {
      modal.componentInstance.onDismiss.subscribe(() => {
        modal.dismiss();
      });
    }

    // listen close all modal from component
    if (modal.componentInstance.onDismissAll) {
      modal.componentInstance.onDismisAll.subscribe(() => {
        this.ngbModal.dismissAll();
      });
    }

    // listen modal onChange and close modal
    if (modal.componentInstance.onChange) {
      modal.componentInstance.onChange.subscribe(() => {
        modal.dismiss();
      });
      return modal.componentInstance.onChange;
    }

    // return default
    return from(modal.result).pipe(catchError(() => of(false)));
  }

  public close(): void {
    if (this.modal) {
      this.modal.dismiss();
    }
  }

  public closeAll(): void {
    if (this.ngbModal) {
      this.ngbModal.dismissAll();
    }
  }
}
