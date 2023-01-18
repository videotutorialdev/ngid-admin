import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PopupService } from '../popup/popup.service';
import { ModalComponent } from './modal.component';

@Injectable()
export class ModalService {
  constructor(private popupService: PopupService) {}
  public saveConfirmation(props?: {
    header?: string;
    message?: string;
    positiveButton?: string;
    negativeButton?: string;
  }): Observable<boolean> {
    return this.popupService.open(
      ModalComponent,
      {
        header: props?.header || 'app.modal.confirmation.header.save',
        message: props?.message || 'app.modal.confirmation.message.save',
        positiveButton: props?.positiveButton || 'app.button.yes',
        negativeButton: props?.negativeButton || 'app.button.cancel',
      },
      {
        size: 'SM',
        windowClass: 'modal-confirm-dialog',
      }
    );
  }

  public deleteConfirmation(): Observable<boolean> {
    return this.popupService.open(
      ModalComponent,
      {
        header: 'app.modal.confirmation.header.delete',
        message: 'app.modal.confirmation.message.delete',
        positiveButton: 'app.button.yes',
        negativeButton: 'app.button.cancel',
      },
      {
        size: 'SM',
        windowClass: 'modal-confirm-dialog',
      }
    );
  }

  public leaveConfirmation(props?: {
    message?: string;
    header?: string;
  }): Observable<boolean> {
    return this.popupService.open(
      ModalComponent,
      {
        header: props?.header || 'app.modal.confirmation.header.leave',
        message: props?.message || 'app.modal.confirmation.message.leave',
        positiveButton: 'app.button.yes',
        negativeButton: 'app.button.cancel',
      },
      {
        size: 'SM',
        windowClass: 'modal-confirm-dialog',
      }
    );
  }

  public confirmation(props?: {
    header?: string;
    message?: string;
    positiveButton?: string;
    negativeButton?: string;
  }): Observable<boolean> {
    return this.popupService.open(
      ModalComponent,
      {
        header: props?.header,
        message: props?.message,
        positiveButton: props?.positiveButton,
        negativeButton: props?.negativeButton,
      },
      {
        size: 'SM',
        windowClass: 'modal-confirm-dialog',
      }
    );
  }
}
