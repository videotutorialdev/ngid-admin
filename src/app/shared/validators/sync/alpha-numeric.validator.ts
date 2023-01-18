import { ValidatorFn } from '@angular/forms';
import { regexValidator } from './regex.validator';
export const alphaNumericValidator = (message?: string): ValidatorFn => {
  return regexValidator(/\w/g, message);
};
