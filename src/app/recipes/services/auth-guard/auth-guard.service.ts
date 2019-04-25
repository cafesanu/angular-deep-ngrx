import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { ICoreState } from 'src/app/core/store/core.reducers';

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';

import { IAuthState } from '../../../auth/store/auth.reducers';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {
  constructor(
    private _store: Store<ICoreState>
  ) { }

  public canActivate(
    route: ActivatedRouteSnapshot, // tslint:disable-line: no-unused
    state: RouterStateSnapshot // tslint:disable-line: no-unused
  ): Observable<boolean> {
    return this._store.select('auth')
      .pipe(
        map((authState: IAuthState) => authState.authenticated)
      );
  }
}
