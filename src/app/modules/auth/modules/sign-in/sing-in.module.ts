import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthSharedModule } from '../../shared/shared.module';
import { SignInComponent } from './sign-in.component';

const routes: Routes = [
  {
    path: '',
    component: SignInComponent,
  },
];

@NgModule({
  imports: [AuthSharedModule, RouterModule.forChild(routes)],
  declarations: [SignInComponent],
})
export class SignInModule {}
