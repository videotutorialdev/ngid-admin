import { Component } from '@angular/core';
import { ControlContainer } from '@angular/forms';
import {
  BaseValueAccessor,
  makeProvider,
} from 'src/app/core/base/base-value-accessor';

@Component({
  selector: 'app-input([type=email])',
  templateUrl: './email.component.html',
  providers: [makeProvider(EmailComponent)],
})
export class EmailComponent extends BaseValueAccessor {
  constructor(controlContainer: ControlContainer) {
    super('app.component.input.component.email', controlContainer);
  }

  protected onInitBaseValueAccessor(): void {
    this.setStateReady();
  }

  public handleInput(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const value = inputElement.value.toLowerCase();
    this.formControl.patchValue(value);
  }
}
