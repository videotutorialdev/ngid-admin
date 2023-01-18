import { NgModule } from '@angular/core';
import { ButtonModule } from './button/button.module';
import { CardModule } from './card/card.module';
import { FormModule } from './form/form.module';

@NgModule({
  imports: [CardModule, FormModule, ButtonModule],
  exports: [CardModule, FormModule, ButtonModule],
})
export class BasicModule {}
