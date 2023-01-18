import { NgModule } from '@angular/core';
import { VendorsModule } from 'src/app/shared/vendors/vendors.module';
import { ScrollComponent } from './scroll.component';

@NgModule({
  imports: [VendorsModule],
  declarations: [ScrollComponent],
  exports: [ScrollComponent],
})
export class ScrollModule {}
