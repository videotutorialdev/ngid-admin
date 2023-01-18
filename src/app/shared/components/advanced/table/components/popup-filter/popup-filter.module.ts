import { NgModule } from '@angular/core';
import { VendorsModule } from 'src/app/shared/vendors/vendors.module';
import { PopupModule } from '../../../popup/popup.module';
import { PopupFilterComponent } from './popup-filter.component';

@NgModule({
  imports: [VendorsModule, PopupModule],
  declarations: [PopupFilterComponent],
  exports: [PopupFilterComponent],
})
export class PopupFilterModule {}
