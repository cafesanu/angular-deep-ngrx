import { Observable } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import { IAuthState } from 'src/app/auth/store/auth.reducers';

import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { ICoreState } from '../../store/core.reducers';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {
  constructor(
    private _store: Store<ICoreState>
  ) { }

  // tslint:disable no-any
  public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this._store.select('auth')
      .pipe(
        take(1),
        switchMap((authState: IAuthState) => {
          const copiedRequest: HttpRequest<any> = request.clone({
            params: request.params.set(
              'auth', authState.token
            )
          });

          return next.handle(copiedRequest);
        })
      );
  }
}
