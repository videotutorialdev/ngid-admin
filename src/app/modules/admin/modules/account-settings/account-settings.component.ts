import { Component } from '@angular/core';
import { BaseModule } from 'src/app/core/base/base-module';

@Component({
  templateUrl: './account-settings.component.html',
})
export class AccountSettingsComponent extends BaseModule {
  constructor() {
    super('module.admin.module.account-settings');
  }

  protected onInit(): void {
    this.setStateReady();
  }
}
