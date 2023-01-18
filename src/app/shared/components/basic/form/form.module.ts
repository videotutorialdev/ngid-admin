import { NgModule } from '@angular/core';
import { AutoCompleteModule } from './auto-complete/auto-complete.module';
import { GroupModule } from './group/group.module';
import { InputModule } from './input/input.module';
import { SelectModule } from './select/select.module';
import { TextareaModule } from './textarea/textarea.module';

@NgModule({
  exports: [
    GroupModule,
    InputModule,
    TextareaModule,
    SelectModule,
    AutoCompleteModule,
  ],
})
export class FormModule {}
