import { Action } from '@ngrx/store';

export enum AuthActionTypes {
  TrySignUp = 'TRY_SIGN_UP',
  TrySignIn = 'TRY_SIGN_IN',
  SignUp = 'SIGN_UP',
  SignIn = 'SIGN_IN',
  LogOut = 'LOG_OUT',
  SetToken = 'SET_TOKEN'
}

export class TrySignUpAction implements Action {
  public type: AuthActionTypes = AuthActionTypes.TrySignUp;

  constructor(public payload: {
    email: string;
    password: string;
  }) {
  }
}

export class TrySignInAction implements Action {
  public type: AuthActionTypes = AuthActionTypes.TrySignIn;

  constructor(public payload: {
    email: string;
    password: string;
  }) {
  }
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

  constructor(public payload: {
    token: string;
  }) {
  }
}

export type AuthActions =
  TrySignUpAction |
  TrySignInAction |
  SignUpAction |
  SignInAction |
  LogOutAction |
  SetTokenAction;
