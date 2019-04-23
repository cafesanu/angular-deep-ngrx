import { Ingredient } from 'src/app/shared/models/ingredient.model';

import {
  AddIngredientAction, ShoppingListActions, ShoppingListActionTypes
} from '../../actions/shopping-list/shopping-list.action';

export interface IShoppingListState {
  ingredients: Ingredient[];
}

const initialState: IShoppingListState = {
  ingredients: [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10)
  ]
};

export function shoppingListReducer(state: IShoppingListState = initialState, action: ShoppingListActions): IShoppingListState {
  // tslint:disable-next-line: no-small-switch
  switch (action.type) {
    case ShoppingListActionTypes.AddIngredient: {
      return {
        ...state,
        ingredients: [
          ...state.ingredients,
          (<AddIngredientAction> action).payload // tslint:disable-line no-unnecessary-type-assertion no-useless-cast
        ]
      };
    }
    default: {
      return {
        ...state
      };
    }
  }
}
