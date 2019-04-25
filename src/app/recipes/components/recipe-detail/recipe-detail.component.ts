import { RecipeService } from 'src/app/core/services/recipe/recipe.service';
import { ICoreState } from 'src/app/core/store/core.reducers';
import { Recipe } from 'src/app/shared/models/recipe.model';
import { AddIngredientsAction } from 'src/app/shopping/store/shopping-list.actions';

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  public recipe: Recipe;

  constructor(
    private _recipeService: RecipeService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _store: Store<ICoreState>
  ) { }

  public ngOnInit(): void {
    this._route.params
      .subscribe((params: Params) => {
        this.recipe = this._recipeService.getRecipe(Number(params.id));
      });
  }

  public onAddToShoppingList(): void {
    this._store.dispatch(new AddIngredientsAction({
      ingredients: this.recipe.ingredients
    }));
  }

  public onEditRecipe(): void {
    // tslint:disable-next-line: no-floating-promises
    this._router.navigate(['edit'], {
      relativeTo: this._route
    });
  }

  public onDeleteRecipe(): void {
    this._recipeService.deleteRecipe(this.recipe.id);
    // tslint:disable-next-line: no-floating-promises
    this._router.navigate(['/recipes']);
  }
}
