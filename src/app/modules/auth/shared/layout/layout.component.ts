import { Component } from '@angular/core';
import { BaseComponent } from 'src/app/core/base/base-component';

@Component({
  selector: 'auth-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent extends BaseComponent {
  constructor() {
    super('auth.layout');
  }

  protected onInit(): void {
    this.setStateReady();
  }
}
