import * as firebase from 'firebase';
import { from, Observable } from 'rxjs';
import { map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { SignInAction } from 'src/app/auth/store/auth.actions';

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { ISignInData } from '../components/sign-in/sign-in.component';
import { AuthActions, AuthActionTypes, SetTokenAction, SignUpAction, TrySignUpAction } from './auth.actions';

@Injectable()
export class AuthEffects {
  @Effect()
  public authSignUp: Observable<AuthActions> = this._actions$.pipe(
    ofType(AuthActionTypes.TrySignUp),
    map((action: TrySignUpAction) => action.payload),

    switchMap((authData: ISignInData) => {
      const { email, password }: ISignInData = authData;

      return from(firebase.auth().createUserWithEmailAndPassword(email, password));
    }),
    switchMap(() => from(firebase.auth().currentUser.getIdToken())),
    mergeMap((token: string) => [
      new SignUpAction(),
      new SetTokenAction({ token })
    ])
  );

  @Effect()
  public authSignIn: Observable<AuthActions> = this._actions$.pipe(
    ofType(AuthActionTypes.TrySignIn),
    map((action: TrySignUpAction) => action.payload),
    switchMap((authData: ISignInData) => {
      const { email, password }: ISignInData = authData;

      return from(firebase.auth().signInWithEmailAndPassword(email, password));
    }),
    switchMap(() => from(firebase.auth().currentUser.getIdToken())),
    mergeMap((token: string) => {
      // tslint:disable-next-line: no-floating-promises
      this._router.navigate(['/']);

      return [
        new SignInAction(),
        new SetTokenAction({ token })
      ];
    })
  );

  @Effect({ dispatch: false })
  public authLogOut: Observable<void> = this._actions$.pipe(
    ofType(AuthActionTypes.LogOut),
    tap(() => {
      this._router.navigate(['/']); // tslint:disable-line: no-floating-promises
      firebase.auth().signOut(); // tslint:disable-line: no-floating-promises
    })
  );

  constructor(
    private _actions$: Actions,
    private _router: Router
  ) {
  }
}
