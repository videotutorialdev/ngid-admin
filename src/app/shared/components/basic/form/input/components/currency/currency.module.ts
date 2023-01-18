import { NgModule } from '@angular/core';
import { PipesModule } from 'src/app/shared/pipes/pipes.module';
import { VendorsModule } from 'src/app/shared/vendors/vendors.module';
import { CurrencyComponent } from './currency.component';

@NgModule({
  imports: [VendorsModule, PipesModule],
  declarations: [CurrencyComponent],
  exports: [CurrencyComponent],
})
export class CurrencyModule {}
