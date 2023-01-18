import { Component } from '@angular/core';
import { BaseModule } from 'src/app/core/base/base-module';

@Component({
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent extends BaseModule {
  constructor() {
    super('module.admin');
  }

  protected onInit(): void {
    this.setStateReady();
  }

  public handleSIgnOut(event: Event): void {
    event.preventDefault();
    this.globalService.session.destroy();
    localStorage.removeItem(this.globalService.constant.SESSION_ID);
    this.router.navigate(['/auth/sign-in']);
  }
}
