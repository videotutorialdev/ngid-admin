import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AccountSettingsComponent } from './account-settings.component';
import { accountSettingsRoutes } from './account-settings.routes';
import { AccountSettingsSharedModule } from './shared/shared.module';

@NgModule({
  imports: [
    AccountSettingsSharedModule,
    RouterModule.forChild(accountSettingsRoutes),
  ],
  declarations: [AccountSettingsComponent],
})
export class AccountSettingsModule {}
