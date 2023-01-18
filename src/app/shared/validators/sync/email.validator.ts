import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

// Regex Docs
// Stack Overflow: rnevius answer
// anaswer url: https://stackoverflow.com/a/46181/8012192
export const emailValidator = (
  message: string = 'app.form.validation.email.default'
): ValidatorFn => {
  return (AC: AbstractControl): ValidationErrors | null => {
    if (AC.value) {
      const regex =
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!regex.test(AC.value)) {
        return { message };
      }
      return null;
    }
    return null;
  };
};
