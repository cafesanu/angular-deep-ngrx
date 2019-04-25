import * as firebase from 'firebase';
import { SignInAction, SetTokenAction, LogOutAction } from 'src/app/auth/store/auth.actions';

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { SignUpAction } from '../../../auth/store/auth.actions';
import { ICoreState } from '../../store/core.reducers';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _token: string | undefined;

  constructor(
    private _router: Router,
    private _store: Store<ICoreState>
  ) { }

  public signUpUser(email: string, password: string): void {
    // tslint:disable-next-line: no-floating-promises
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(() => {
        this._store.dispatch(new SignUpAction());

        return firebase.auth().currentUser.getIdToken();
      })
      .then((token: string) => {
        this._store.dispatch(new SetTokenAction({ token }));
        this._router.navigate(['/']); // tslint:disable-line: no-floating-promises
      });
  }

  public signInUser(email: string, password: string): void {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(() => {
        this._store.dispatch(new SignInAction());

        return firebase.auth().currentUser.getIdToken();
      })
      .then((token: string) => {
        this._store.dispatch(new SetTokenAction({ token }));
        this._router.navigate(['/']); // tslint:disable-line: no-floating-promises
      });
  }

  public logout(): void {
    // tslint:disable-next-line: no-floating-promises
    firebase.auth().signOut();
    this._store.dispatch(new LogOutAction());
  }
}
