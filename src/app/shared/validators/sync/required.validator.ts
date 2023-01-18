import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
export const requiredValidator = (
  message: string = 'app.form.validation.required.default'
): ValidatorFn => {
  return (AC: AbstractControl): ValidationErrors | null => {
    if (
      !AC.value ||
      (AC.value && Array.isArray(AC.value) && AC.value.length === 0)
    ) {
      return { message };
    }
    return null;
  };
};
