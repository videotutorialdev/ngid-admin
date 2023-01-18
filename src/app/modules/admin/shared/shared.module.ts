import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { LayoutModule } from './layout/layout.module';

@NgModule({
  imports: [SharedModule, LayoutModule],
  exports: [SharedModule, LayoutModule],
})
export class AdminSharedModule {}
