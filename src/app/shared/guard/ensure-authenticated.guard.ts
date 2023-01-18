import { Injectable } from '@angular/core';
import { CanActivateChild, Router } from '@angular/router';
import { GlobalService } from 'src/app/core/service/global.service';
@Injectable({
  providedIn: 'root',
})
export class EnsureAuthenticatedGuard implements CanActivateChild {
  constructor(private global: GlobalService, private router: Router) {}

  canActivateChild(): boolean {
    if (!this.global.session.isLoggedIn) {
      this.router.navigate(['/auth/sign-in']);
    }
    return true;
  }
}
