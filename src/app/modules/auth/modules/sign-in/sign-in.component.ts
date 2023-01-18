import { Component } from '@angular/core';
import { BaseModule } from 'src/app/core/base/base-module';
import { UserResponseDTO } from 'src/app/core/dtos';
import { UserModel } from 'src/app/core/models/user.model';
import { Validators } from 'src/app/shared/validators';
import { SignInRequestDTO } from '../../shared/dtos/sign-in.dto';
import { AuthService } from '../../shared/service/auth.service';
@Component({
  templateUrl: './sign-in.component.html',
})
export class SignInComponent extends BaseModule {
  constructor(private _authService: AuthService) {
    super('module.auth.module.sign-in');
  }

  protected onInit(): void {
    this.buildFormGroup();
    this.setStateReady();
  }

  private buildFormGroup(): void {
    this.formGroup = this.formBuilder.group({
      username: [
        'admin',
        Validators.required(
          `${this.moduleCode}.form.validation.required.username`
        ),
      ],
      password: [
        'pass',
        Validators.required(
          `${this.moduleCode}.form.validation.required.password`
        ),
      ],
    });
  }

  public handleSignIn(): void {
    this.validate();
    if (this.formGroup.valid && !this.formGroup.disabled) {
      const dto: SignInRequestDTO = this.formGroup.value;
      this.setStateProcessing();
      this._authService.signIn(dto).subscribe({
        next: (user: UserResponseDTO) => {
          if (user) {
            this.setStateReady();
            const model = UserModel.create(user);
            const token = btoa(JSON.stringify(user));
            this.globalService.session.setToken(token);
            this.globalService.session.setUser(model);
            localStorage.setItem(this.globalService.constant.SESSION_ID, token);
            this.globalService.toastService.showSuccess(
              `${this.moduleCode}.toast.success.signIn`
            );
            this.router.navigate(['/']);
          } else {
            this.setStateReady();
            this.globalService.toastService.showError(
              `${this.moduleCode}.toast.error.invalidUsernameOrPassword`
            );
            this.formGroup.get('username')?.setErrors({
              message: '',
            });
            this.formGroup.get('password')?.setErrors({
              message: '',
            });
          }
        },
        error: () => {
          this.setStateReady();
          this.globalService.toastService.showError(
            `${this.moduleCode}.toast.error.failedSignIn`
          );
        },
      });
    }
  }
}
