import { NgModule } from '@angular/core';
import { VendorsModule } from 'src/app/shared/vendors/vendors.module';
import { PasswordComponent } from './password.component';

@NgModule({
  imports: [VendorsModule],
  declarations: [PasswordComponent],
  exports: [PasswordComponent],
})
export class PasswordModule {}
