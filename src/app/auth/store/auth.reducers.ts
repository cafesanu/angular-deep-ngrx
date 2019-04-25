import {AuthActions, AuthActionTypes, SignUpAction, SignInAction, LogOutAction, SetTokenAction} from './auth.actions';

export interface IAuthState {
  token: string | null;
  authenticated: boolean;
}

const initialState: IAuthState = {
  token: null,
  authenticated: false
};

// tslint:disable-next-line: no-big-function
export function authReducer(
  state: IAuthState = initialState,
  action: AuthActions
): IAuthState {
  // tslint:disable-next-line: no-small-switch
  switch (action.type) {
    case AuthActionTypes.SignIn:
    case AuthActionTypes.SignUp: {
      return {
        ...state,
        authenticated: true
      };
    }
    case AuthActionTypes.LogOut: {
      return {
        ...state,
        token: null,
        authenticated: false
      };
    }
    case AuthActionTypes.SetToken: {
      const actualAction: SetTokenAction = <SetTokenAction> action;

      return {
        ...state,
        token: actualAction.payload.token
      };
    }
    default: {
      return {
        ...state
      };
    }
  }
}
