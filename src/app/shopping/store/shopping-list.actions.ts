import { Action } from '@ngrx/store';
import { Ingredient } from 'src/app/shared/models/ingredient.model';

export enum ShoppingListActionTypes {
  AddIngredient = 'ADD_INGREDIENT',
  AddIngredients = 'ADD_INGREDIENTS',
  UpdateIngredient = 'UPDATE_INGREDIENT',
  DeleteIngredient = 'DELETE_INGREDIENTS',
  StartEdit = 'START_EDIT',
  StopEdit = 'STOP_EDIT'
}

export class AddIngredientAction implements Action {
  public type: ShoppingListActionTypes = ShoppingListActionTypes.AddIngredient;

  constructor(
    public payload: {
      ingredient: Ingredient;
    }
  ) {
  }
}

export class AddIngredientsAction implements Action {
  public type: string = ShoppingListActionTypes.AddIngredients;

  constructor(
    public payload: {
      ingredients: Ingredient[];
    }
  ) {
  }
}

export class UpdateIngredientAction implements Action {
  public type: string = ShoppingListActionTypes.UpdateIngredient;

  constructor(
    public payload: {
      ingredient: Ingredient;
    }
  ) {
  }
}

export class DeleteIngredientAction implements Action {
  public type: string = ShoppingListActionTypes.DeleteIngredient;
}

export class StartEditIngredientAction implements Action {
  public type: string = ShoppingListActionTypes.StartEdit;

  constructor(
    public payload: {
      index: number;
    }
  ) {
  }
}

export class StopEditIngredientAction implements Action {
  public type: string = ShoppingListActionTypes.StopEdit;
}

export type ShoppingListActions =
  AddIngredientAction |
  AddIngredientsAction |
  UpdateIngredientAction |
  DeleteIngredientAction |
  StartEditIngredientAction |
  StopEditIngredientAction;
