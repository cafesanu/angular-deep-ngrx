import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

@Injectable()
export class AuthEffects {
  @Effect()
  public authSignUp;

  constructor(private _actions$: Actions) {
    this.authSignUp = this._actions$.pipe(
      ofType()
    );
  }

}
