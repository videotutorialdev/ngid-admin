import { CurrencyPipe } from '@angular/common';
import { Component } from '@angular/core';
import { ControlContainer } from '@angular/forms';
import {
  BaseValueAccessor,
  makeProvider,
} from 'src/app/core/base/base-value-accessor';

@Component({
  selector: 'app-input([type=currency])',
  templateUrl: './currency.component.html',
  providers: [makeProvider(CurrencyComponent)],
})
export class CurrencyComponent extends BaseValueAccessor {
  constructor(
    controlContainer: ControlContainer,
    private _currencyPipe: CurrencyPipe
  ) {
    super('app.currency', controlContainer);
  }

  protected onInitBaseValueAccessor(): void {
    this.setStateReady();
  }

  public handleInput(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const value = inputElement.value.replace(/\D/g, '');
    this.formControl.patchValue(value);
    inputElement.value =
      this._currencyPipe.transform(value, '', '', '0.0-0') || '';
  }
}
