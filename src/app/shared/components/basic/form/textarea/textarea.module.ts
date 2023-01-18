import { NgModule } from '@angular/core';
import { VendorsModule } from 'src/app/shared/vendors/vendors.module';
import { TextareaComponent } from './textarea.component';

@NgModule({
  imports: [VendorsModule],
  declarations: [TextareaComponent],
  exports: [TextareaComponent],
})
export class TextareaModule {}
