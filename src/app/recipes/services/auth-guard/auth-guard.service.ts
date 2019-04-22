import { AuthService } from 'src/app/core/services/auth/auth.service';

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {
  constructor(
    private _authService: AuthService
  ) { }

  public canActivate(
    route: ActivatedRouteSnapshot, // tslint:disable-line: no-unused
    state: RouterStateSnapshot // tslint:disable-line: no-unused
  ): boolean {
    return this._authService.isAuthenticated();
  }
}
