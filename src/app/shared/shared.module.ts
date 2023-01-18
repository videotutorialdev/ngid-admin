import { NgModule } from '@angular/core';
import { ComponentsModule } from './components/components.module';
import { LayoutModule } from './layout/layout.module';
import { PipesModule } from './pipes/pipes.module';
import { ServicesModule } from './services/services.module';
import { VendorsModule } from './vendors/vendors.module';

@NgModule({
  exports: [
    VendorsModule,
    PipesModule,
    ComponentsModule,
    LayoutModule,
    ServicesModule,
  ],
})
export class SharedModule {}
