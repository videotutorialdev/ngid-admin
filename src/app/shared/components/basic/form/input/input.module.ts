import { NgModule } from '@angular/core';
import { AlphaNumericModule } from './components/alpha-numeric/alpha-numeric.module';
import { CurrencyModule } from './components/currency/currency.module';
import { DefaultModule } from './components/default/default.module';
import { EmailModule } from './components/email/email.module';
import { PasswordModule } from './components/password/password.module';

@NgModule({
  exports: [
    DefaultModule,
    EmailModule,
    PasswordModule,
    CurrencyModule,
    AlphaNumericModule,
  ],
})
export class InputModule {}
