import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
export const regexValidator = (
  regex: RegExp,
  message?: string
): ValidatorFn => {
  return (control: AbstractControl): ValidationErrors | null => {
    if (control.value) {
      if (!regex.test(control.value)) return { message };
    }
    return null;
  };
};
