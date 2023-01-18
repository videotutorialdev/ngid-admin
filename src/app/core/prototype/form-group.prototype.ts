import { EventEmitter } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';

declare module '@angular/forms' {
  interface FormGroup {
    getErrorMessage(): string;
  }

  interface AbstractControl {
    isView: boolean;
    isSubmitted: boolean;
    isViewChanges: EventEmitter<boolean>;
    isSubmittedChanges: EventEmitter<boolean>;
    setStateIsView(isView: boolean): void;
    setStateSubmitted(): void;
    resetStateSubmitted(): void;
  }
}

AbstractControl.prototype.isViewChanges = new EventEmitter();
AbstractControl.prototype.isSubmittedChanges = new EventEmitter();

AbstractControl.prototype.setStateIsView = function (isView: boolean): void {
  this.isView = isView;
  this.isViewChanges.emit(isView);
};

AbstractControl.prototype.setStateSubmitted = function (): void {
  this.isSubmitted = true;
  this.markAllAsTouched();
  this.isSubmittedChanges.emit(true);
};

AbstractControl.prototype.resetStateSubmitted = function (): void {
  this.isSubmitted = false;
  this.isSubmittedChanges.emit(false);
};

FormGroup.prototype.getErrorMessage = function () {
  if (!(this instanceof FormGroup)) return null;
  return Object.keys(this.controls)
    .map((control) => this.get(control)?.errors)
    .filter((error) => error)[0]?.message;
};
