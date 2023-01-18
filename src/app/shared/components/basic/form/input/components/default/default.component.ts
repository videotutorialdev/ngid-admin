import { Component, Input } from '@angular/core';
import { ControlContainer } from '@angular/forms';
import {
  BaseValueAccessor,
  makeProvider,
} from 'src/app/core/base/base-value-accessor';

@Component({
  selector: 'app-input:not([type]),app-input[type=text],app-input[type=date]',
  templateUrl: './default.component.html',
  providers: [makeProvider(DefaultComponent)],
})
export class DefaultComponent extends BaseValueAccessor {
  @Input() type: 'text' | 'date';
  @Input() max: string | null;
  constructor(controlContainer: ControlContainer) {
    super('app-input', controlContainer);
  }

  protected onInitBaseValueAccessor(): void {
    this.setStateReady();
  }
}
