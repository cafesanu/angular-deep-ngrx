import { Action } from '@ngrx/store';
import { Ingredient } from 'src/app/shared/models/ingredient.model';

export enum ShoppingListActionTypes {
  AddIngredient = 'ADD_INGREDIENT'
}

export class AddIngredientAction implements Action {
  public type: string = ShoppingListActionTypes.AddIngredient;

  constructor(
    public payload: Ingredient
  ) {
  }
}

export type ShoppingListActions = AddIngredientAction;
