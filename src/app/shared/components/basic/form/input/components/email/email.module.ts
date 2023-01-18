import { NgModule } from '@angular/core';
import { VendorsModule } from 'src/app/shared/vendors/vendors.module';
import { EmailComponent } from './email.component';

@NgModule({
  imports: [VendorsModule],
  declarations: [EmailComponent],
  exports: [EmailComponent],
})
export class EmailModule {}
