import { Subject } from 'rxjs';
import { Ingredient } from 'src/app/shared/models/ingredient.model';

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ShoppingListService {
  public ingredientsChanged: Subject<Ingredient[]> = new Subject<Ingredient[]>();
  public startedEditing: Subject<number> = new Subject<number>();

  private _ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10)
  ];

  constructor() {
  }

  public addIngredients(ingredients: Ingredient[]): void {
    this._ingredients = [
      ...this._ingredients,
      ...ingredients
    ];
    this.ingredientsChanged.next(this._ingredients.slice());
  }

  public getIngredient(index: number): Ingredient {
    return this._ingredients[index];
  }

  public updateIngredient(index: number, newIngredient: Ingredient): void {
    this._ingredients[index] = newIngredient;
    this.ingredientsChanged.next(this._ingredients.slice());
  }

  public deleteIngredient(index: number): void {
    this._ingredients.splice(index, 1);

    this.ingredientsChanged.next(this._ingredients.slice());
  }
}
