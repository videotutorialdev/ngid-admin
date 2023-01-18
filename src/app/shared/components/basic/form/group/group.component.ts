import { Component, Input } from '@angular/core';
import { BaseComponent } from 'src/app/core/base/base-component';

@Component({
  selector: 'app-form-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss'],
})
export class GroupComponent extends BaseComponent {
  @Input() public label: string;
  @Input() public required: boolean;
  @Input() public labelFor: string;

  constructor() {
    super('app.form-group');
  }

  protected onInit(): void {
    this.setStateReady();
  }
}
