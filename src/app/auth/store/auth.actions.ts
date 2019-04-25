import { Action } from '@ngrx/store';

export enum AuthActionTypes {
  SignUp = 'SIGN_UP',
  SignIn = 'SIGN_IN',
  LogOut = 'LOG_OUT',
  SetToken = 'SET_TOKEN'
}

export class SignUpAction implements Action {
  public type: AuthActionTypes = AuthActionTypes.SignUp;
}

export class SignInAction implements Action {
  public type: AuthActionTypes = AuthActionTypes.SignIn;
}

export class LogOutAction implements Action {
  public type: AuthActionTypes = AuthActionTypes.LogOut;
}

export class SetTokenAction implements Action {
  public type: AuthActionTypes = AuthActionTypes.SetToken;

  constructor(
    public payload: {
      token: string;
    }
  ) {
  }
}

export type AuthActions =
  SignUpAction |
  SignInAction |
  LogOutAction |
  SetTokenAction;
