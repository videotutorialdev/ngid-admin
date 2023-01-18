import { Component } from '@angular/core';
import { ControlContainer } from '@angular/forms';
import {
  BaseValueAccessor,
  makeProvider,
} from 'src/app/core/base/base-value-accessor';

@Component({
  selector: 'app-input([type=alphaNumeric])',
  templateUrl: './alpha-numeric.component.html',
  providers: [makeProvider(AlphaNumericComponent)],
})
export class AlphaNumericComponent extends BaseValueAccessor {
  constructor(controlContainer: ControlContainer) {
    super('app.alpha-numeric', controlContainer);
  }

  protected onInitBaseValueAccessor(): void {
    this.setStateReady();
  }

  public handleInput(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const value = inputElement.value.replace(/\W/g, '');
    this.formControl.patchValue(value);
  }
}
