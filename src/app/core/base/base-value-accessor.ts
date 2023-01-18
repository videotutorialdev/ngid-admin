import {
  Component,
  EventEmitter,
  forwardRef,
  Inject,
  Input,
  Output,
  Provider,
} from '@angular/core';
import {
  ControlContainer,
  ControlValueAccessor,
  FormControl,
  FormGroup,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
} from '@angular/forms';
import { BaseComponent } from './base-component';

export function makeProvider(componentTarget: any): Provider {
  return {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => componentTarget),
    multi: true,
  };
}

@Component({
  template: '',
})
export abstract class BaseValueAccessor
  extends BaseComponent
  implements ControlValueAccessor
{
  @Input() formControlName: string;
  @Input() placeholder: string;
  @Input() options: Array<any>;
  @Input() optionViewPath: string;
  @Input() optionValuePath: string;
  @Input() size: 'SM' | 'MD' | 'LG';

  @Output() onChange: EventEmitter<any>;

  public value: any;
  public isDisabled: boolean;

  public onBaseChange: (value: string) => void;
  public onBaseTouched: (value: string) => void;

  public formControl: FormControl;

  protected abstract onInitBaseValueAccessor(): void;
  constructor(
    @Inject(String) moduleCode: string,
    private controlContainer: ControlContainer
  ) {
    super(moduleCode);
    this.onChange = new EventEmitter();
  }

  onInit() {
    this.setFormGroupState();
    this.setFormControlState();
    this.onInitBaseValueAccessor();
  }

  private setFormGroupState(): void {
    this.formGroup = this.controlContainer.control as FormGroup;
  }

  private setFormControlState(): void {
    this.formControl = this.formGroup.get(this.formControlName) as FormControl;
  }

  public get isValid(): boolean {
    return (
      (this.formControl.dirty || this.formControl.touched) &&
      this.formControl.valid
    );
  }

  public get isInvalid(): boolean {
    return (
      (this.formControl.dirty || this.formControl.touched) &&
      this.formControl.invalid
    );
  }

  public get errors(): ValidationErrors {
    return this.formControl.errors as ValidationErrors;
  }

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onBaseChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onBaseTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }
}
