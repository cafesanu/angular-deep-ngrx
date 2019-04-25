import { Ingredient } from 'src/app/shared/models/ingredient.model';

import {
  AddIngredientAction, AddIngredientsAction, ShoppingListActions, ShoppingListActionTypes, StartEditIngredientAction,
  UpdateIngredientAction
} from './shopping-list.actions';

export interface IShoppingListState {
  ingredients: Ingredient[];
  editedIngredient: Ingredient | null;
  editedIngredientIndex: number | null;
}

const initialState: IShoppingListState = {
  ingredients: [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10)
  ],
  editedIngredient: null,
  editedIngredientIndex: null
};

// tslint:disable-next-line: no-big-function
export function shoppingListReducer(state: IShoppingListState = initialState, action: ShoppingListActions): IShoppingListState {
  // tslint:disable-next-line: no-small-switch
  switch (action.type) {
    case ShoppingListActionTypes.AddIngredient: {
      return {
        ...state,
        ingredients: [
          ...state.ingredients,
          (<AddIngredientAction> action).payload.ingredient
        ]
      };
    }
    case ShoppingListActionTypes.AddIngredients: {
      return {
        ...state,
        ingredients: [
          ...state.ingredients,
          ...(<AddIngredientsAction> action).payload.ingredients
        ]
      };
    }
    case ShoppingListActionTypes.UpdateIngredient: {
      const updateIngredientAction: UpdateIngredientAction = <UpdateIngredientAction> action;
      const ingredient: Ingredient = state.ingredients[state.editedIngredientIndex];
      const upgradedIngredient: Ingredient = {
        ...ingredient,
        ...updateIngredientAction.payload.ingredient
      };
      const ingredients: Ingredient[] = [...state.ingredients];

      ingredients[state.editedIngredientIndex] = upgradedIngredient;

      return {
        ...state,
        ingredients: ingredients,
        editedIngredient: null,
        editedIngredientIndex: null
      };
    }
    case ShoppingListActionTypes.DeleteIngredient: {
      const ingredients: Ingredient[] = [...state.ingredients];

      ingredients.splice(state.editedIngredientIndex, 1);

      return {
        ...state,
        ingredients: ingredients,
        editedIngredient: null,
        editedIngredientIndex: null
      };
    }
    case ShoppingListActionTypes.StartEdit: {
      const startEditIngredientAction: StartEditIngredientAction = <StartEditIngredientAction> action;

      return {
        ...state,
        editedIngredient: {
          ...state.ingredients[startEditIngredientAction.payload.index]
        },
        editedIngredientIndex: startEditIngredientAction.payload.index
      };
    }
    case ShoppingListActionTypes.StopEdit: {
      return {
        ...state,
        editedIngredient: null,
        editedIngredientIndex: null
      };
    }
    default: {
      return {
        ...state
      };
    }
  }
}
