import { Component } from '@angular/core';
import { ControlContainer } from '@angular/forms';
import {
  BaseValueAccessor,
  makeProvider,
} from 'src/app/core/base/base-value-accessor';
import { ObjectHelper } from 'src/app/shared/helpers/object.helper';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  providers: [makeProvider(SelectComponent)],
})
export class SelectComponent extends BaseValueAccessor {
  constructor(controlContainer: ControlContainer) {
    super('app.component.input.component.select', controlContainer);
  }

  protected onInitBaseValueAccessor(): void {
    this.setStateReady();
  }

  public compareFn(option1: any, option2: any): boolean {
    if (!option1 || !option2) return false;
    return option1 && option2 && this.optionValuePath
      ? ObjectHelper.resolveValue(option1, this.optionValuePath) ===
          ObjectHelper.resolveValue(option1, this.optionValuePath)
      : JSON.stringify(
          option1 && option1.props && option1.value
            ? option1.value
            : option1.props
            ? option1.props.name || option1.props.id
            : option1
        ) ===
          JSON.stringify(
            option2 && option2.props && option2.value
              ? option2.value
              : option2.props
              ? option2.props.name || option2.props.id
              : option2
          );
  }

  public handleChange(event: any): void {
    if (event.target.value === 'null') {
      this.formControl.patchValue(null);
    }
    this.onChange.emit(this.formControl.value);
  }
}
