import { NgModule } from '@angular/core';
import { VendorsModule } from 'src/app/shared/vendors/vendors.module';
import { GroupComponent } from './group.component';

@NgModule({
  imports: [VendorsModule],
  declarations: [GroupComponent],
  exports: [GroupComponent],
})
export class GroupModule {}
