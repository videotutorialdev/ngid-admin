import { ToastPositionType } from './toast-position.type';
import { ToastVariantType } from './toast-variant.type';
export interface ToastOptions {
  variant?: ToastVariantType;
  position?: ToastPositionType;
  interval?: number;
}
