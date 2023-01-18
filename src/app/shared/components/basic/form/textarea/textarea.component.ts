import { Component } from '@angular/core';
import { ControlContainer } from '@angular/forms';
import {
  BaseValueAccessor,
  makeProvider,
} from 'src/app/core/base/base-value-accessor';

@Component({
  selector: 'app-textarea',
  templateUrl: './textarea.component.html',
  providers: [makeProvider(TextareaComponent)],
})
export class TextareaComponent extends BaseValueAccessor {
  constructor(controlContainer: ControlContainer) {
    super('app.textarea', controlContainer);
  }

  protected onInitBaseValueAccessor(): void {
    this.setStateReady();
  }
}
