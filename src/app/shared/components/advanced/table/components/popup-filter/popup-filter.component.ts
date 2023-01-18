import {
  Component,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
} from '@angular/core';
import { BaseComponent } from 'src/app/core/base/base-component';

@Component({
  templateUrl: './popup-filter.component.html',
})
export class PopupFilterComponent extends BaseComponent {
  @Input() public filterTempl: TemplateRef<any>;
  @Output() public onDismiss: EventEmitter<void>;
  constructor() {
    super('app.table.component.popup-filter');
    this.onDismiss = new EventEmitter();
  }

  protected onInit(): void {
    this.setStateReady();
  }
}
