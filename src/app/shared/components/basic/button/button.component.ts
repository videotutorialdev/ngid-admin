import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BaseComponent } from 'src/app/core/base/base-component';
import { SizeType, VariantType } from 'src/app/shared/type';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
})
export class ButtonComponent extends BaseComponent {
  @Input() public variant: VariantType;
  @Input() public size: SizeType;

  @Output() onClick: EventEmitter<MouseEvent>;

  constructor() {
    super('app.button');
    this.onClick = new EventEmitter();
  }

  protected onInit(): void {
    this.setStateReady();
  }
}
