import { NgModule } from '@angular/core';
import { PipesModule } from 'src/app/shared/pipes/pipes.module';
import { VendorsModule } from 'src/app/shared/vendors/vendors.module';
import { SelectComponent } from './select.component';

@NgModule({
  imports: [VendorsModule, PipesModule],
  declarations: [SelectComponent],
  exports: [SelectComponent],
})
export class SelectModule {}
