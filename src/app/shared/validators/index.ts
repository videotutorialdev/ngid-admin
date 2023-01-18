import { Validators as AngularValidators } from '@angular/forms';
import { alphaNumericValidator } from './sync/alpha-numeric.validator';
import { emailValidator } from './sync/email.validator';
import { requiredValidator } from './sync/required.validator';
export const Validators = {
  compose: AngularValidators.compose,
  composeAsync: AngularValidators.composeAsync,
  // custom validators
  email: emailValidator,
  required: requiredValidator,
  alphaNumeric: alphaNumericValidator,
};
