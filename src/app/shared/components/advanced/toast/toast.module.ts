import { NgModule } from '@angular/core';
import { VendorsModule } from 'src/app/shared/vendors/vendors.module';
import { ToastComponent } from './toast.component';

@NgModule({
  imports: [VendorsModule],
  declarations: [ToastComponent],
  exports: [ToastComponent],
})
export class ToastModule {}
