import { NgModule } from '@angular/core';
import { VendorsModule } from 'src/app/shared/vendors/vendors.module';
import { SelectModule } from '../../basic/form/select/select.module';
import { LangSwitcherComponent } from './lang-switcher.component';

@NgModule({
  imports: [VendorsModule, SelectModule],
  declarations: [LangSwitcherComponent],
  exports: [LangSwitcherComponent],
})
export class LangSwitcherModule {}
