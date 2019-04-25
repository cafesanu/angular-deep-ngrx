import { authReducer, IAuthState } from 'src/app/auth/store/auth.reducers';
import { IShoppingListState, shoppingListReducer } from 'src/app/shopping/store/shopping-list.reducers';

import { ActionReducerMap } from '@ngrx/store';

export interface ICoreState {
  shoppingList: IShoppingListState;
  auth: IAuthState;
}

export const coreReducers: ActionReducerMap<ICoreState> = {
  shoppingList: shoppingListReducer,
  auth: authReducer
};
