import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthComponent } from './auth.component';
import { authRoutes } from './auth.routing';
import { AuthService } from './shared/service/auth.service';
import { AuthSharedModule } from './shared/shared.module';

@NgModule({
  imports: [AuthSharedModule, RouterModule.forChild(authRoutes)],
  declarations: [AuthComponent],
  providers: [AuthService],
})
export class AuthModule {}
