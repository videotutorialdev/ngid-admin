import { NgModule } from '@angular/core';
import { VendorsModule } from 'src/app/shared/vendors/vendors.module';
import { DefaultComponent } from './default.component';

@NgModule({
  imports: [VendorsModule],
  declarations: [DefaultComponent],
  exports: [DefaultComponent],
})
export class DefaultModule {}
