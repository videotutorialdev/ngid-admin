import { NgModule } from '@angular/core';
import { AdvancedModule } from './advanced/advanced.module';
import { BasicModule } from './basic/basic.module';

@NgModule({
  exports: [AdvancedModule, BasicModule],
})
export class ComponentsModule {}
