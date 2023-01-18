import { Component } from '@angular/core';
import { BaseModule } from 'src/app/core/base/base-module';

@Component({
  templateUrl: './auth.component.html',
})
export class AuthComponent extends BaseModule {
  constructor() {
    super('auth');
  }

  protected onInit(): void {
    this.setStateReady();
  }
}
