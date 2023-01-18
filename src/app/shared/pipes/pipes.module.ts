import { NgModule } from '@angular/core';
import { CustomCurrencyPipe } from './custom-currency.pipe';
import { ResolveValuePipe } from './resolve-value.pipe';

@NgModule({
  declarations: [CustomCurrencyPipe, ResolveValuePipe],
  exports: [CustomCurrencyPipe, ResolveValuePipe],
})
export class PipesModule {}
