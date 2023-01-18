import { NgModule } from '@angular/core';
import { VendorsModule } from 'src/app/shared/vendors/vendors.module';
import { CardComponent } from './card.component';

@NgModule({
  imports: [VendorsModule],
  declarations: [CardComponent],
  exports: [CardComponent],
})
export class CardModule {}
