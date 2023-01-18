import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseModule } from 'src/app/core/base/base-module';

@Component({
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss'],
})
export class ErrorComponent extends BaseModule {
  public statusCode: number;
  constructor(private _route: ActivatedRoute) {
    super('module.error');
  }

  protected onInit(): void {
    this.setStateInitialization();
    this.setStateReady();
  }

  private setStateInitialization(): void {
    this.statusCode = this._route.snapshot.data.status;
  }

  public handleBackToHomePage(): void {
    this.router.navigate(['/']);
  }
}
