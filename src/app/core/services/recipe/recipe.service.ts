import { Subject } from 'rxjs';
import { Ingredient } from 'src/app/shared/models/ingredient.model';
import { Recipe } from 'src/app/shared/models/recipe.model';

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  public recipesChanged: Subject<Recipe[]> = new Subject<Recipe[]>();

  private _nextId: number = 1;
  private _recipes: Recipe[] = [
    new Recipe(
      'Arroz con pollo',
      'Can\'t go wrong with chicken and rice',
      'https://www.tasteofhome.com/wp-content/uploads/2017/10/Healthier-than-Egg-Rolls_EXPS_SDON17_55166_C06_23_6b-696x696.jpg',
      [
        new Ingredient('Chicken', 1),
        new Ingredient('Rice', 1)
      ],
      this._nextId++
    ),

    new Recipe(
      'Paella',
      'Con mariscos y chorizo',
      'https://www.janellapurcell.com/wp-content/uploads/2016/07/paella.jpg',
      [
        new Ingredient('Shrimp', 12),
        new Ingredient('Chorizo', 2)
      ],
      this._nextId++
    )
  ];

  constructor(
  ) {
  }

  public getRecipes(): Recipe[] {
    return this._recipes.slice();
  }

  public setRecipes(recipes: Recipe[]): void {
    this._recipes = recipes.slice();
    this.recipesChanged.next(this._recipes.slice());
  }

  public getRecipe(id: number): Recipe {
    return this._recipes.find((recipe: Recipe) => recipe.id === id);
  }

  public addRecipe(recipe: Recipe): void {
    this._recipes.push(new Recipe(
      recipe.name,
      recipe.description,
      recipe.imagePath,
      recipe.ingredients,
      this._nextId++
    ));
    this.recipesChanged.next(this._recipes.slice());
  }

  public editRecipe(recipe: Recipe): void {
    const index: number = this._recipes.findIndex((r: Recipe) => r.id === recipe.id);

    if (index !== -1) {
      this._recipes[index] = recipe;
    }
    this.recipesChanged.next(this._recipes.slice());
  }

  public deleteRecipe(id: number): void {
    const index: number = this._recipes.findIndex((r: Recipe) => r.id === id);

    if (index !== -1) {
      this._recipes.splice(index, 1);
      this.recipesChanged.next(this._recipes.slice());
    }
  }
}
