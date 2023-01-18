import { NgModule } from '@angular/core';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { VendorsModule } from 'src/app/shared/vendors/vendors.module';
import { ScrollModule } from '../../scroll/scroll.module';
import { AutoCompleteComponent } from './auto-complete.component';

@NgModule({
  imports: [VendorsModule, PerfectScrollbarModule, ScrollModule],
  declarations: [AutoCompleteComponent],
  exports: [AutoCompleteComponent],
})
export class AutoCompleteModule {}
