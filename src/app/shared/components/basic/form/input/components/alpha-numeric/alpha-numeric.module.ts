import { NgModule } from '@angular/core';
import { PipesModule } from 'src/app/shared/pipes/pipes.module';
import { VendorsModule } from 'src/app/shared/vendors/vendors.module';
import { AlphaNumericComponent } from './alpha-numeric.component';

@NgModule({
  imports: [VendorsModule, PipesModule],
  declarations: [AlphaNumericComponent],
  exports: [AlphaNumericComponent],
})
export class AlphaNumericModule {}
