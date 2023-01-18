import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { adminRoutes } from './admin.routes';
import { AdminSharedModule } from './shared/shared.module';

@NgModule({
  imports: [AdminSharedModule, RouterModule.forChild(adminRoutes)],
  declarations: [AdminComponent],
})
export class AdminModule {}
