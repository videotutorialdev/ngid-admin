import { Injectable } from '@angular/core';
import { ComponentService } from 'src/app/core/service/component.service';
import { ToastOptions } from './toast-options';
import { ToastComponent } from './toast.component';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private _component: ComponentService) {}

  show(message: string, options?: ToastOptions): void {
    const defaultOptions: ToastOptions = {
      variant: 'DARK',
    };
    this.createToast(message, Object.assign(defaultOptions, options || {}));
  }

  showInfo(message: string, options?: ToastOptions): void {
    const defaultOptions: ToastOptions = {
      variant: 'INFO',
    };
    this.createToast(message, Object.assign(defaultOptions, options || {}));
  }

  showSuccess(message: string, options?: ToastOptions): void {
    const defaultOptions: ToastOptions = {
      variant: 'SUCCESS',
    };
    this.createToast(message, Object.assign(defaultOptions, options || {}));
  }

  showWarning(message: string, options?: ToastOptions): void {
    const defaultOptions: ToastOptions = {
      variant: 'WARNING',
    };
    this.createToast(message, Object.assign(defaultOptions, options || {}));
  }

  showError(message: string, options?: ToastOptions): void {
    const defaultOptions: ToastOptions = {
      variant: 'DANGER',
    };
    this.createToast(message, Object.assign(defaultOptions, options || {}));
  }

  private createToast(message: string, options?: ToastOptions): void {
    const toastWrapper = this.createToatsWrapper(options);
    const toastContainer = document.createElement('div');
    toastContainer.classList.add(
      'custom-toast-container',
      `bg-${options?.variant?.toLowerCase()}`
    );

    const component = this._component.create(ToastComponent, toastContainer, {
      message,
      options,
    });

    toastWrapper.appendChild(toastContainer);

    const timeOut: NodeJS.Timeout = setTimeout(() => {
      component.destroy();
      this.clear(toastWrapper);
    }, options?.interval || 2000);

    component.instance.onClose.subscribe(() => {
      component.destroy();
      clearTimeout(timeOut);
      this.clear(toastWrapper);
    });
  }

  private createToatsWrapper(options?: ToastOptions): Element {
    const toastElement = document.getElementsByClassName(
      `custom-toast-${(options?.position || 'TOP-RIGHT').toLowerCase()}`
    )[0];
    if (!toastElement) {
      const toastWrapper = document.createElement('div');
      toastWrapper.classList.add(
        'custom-toast-wrapper',
        `custom-toast-${(options?.position || 'TOP-RIGHT').toLowerCase()}`
      );
      document.body.appendChild(toastWrapper);
      return toastWrapper;
    }
    return toastElement;
  }

  private clear(element: Element): void {
    if (element.children.length === 1) {
      document.body.removeChild(element);
    }
  }
}
