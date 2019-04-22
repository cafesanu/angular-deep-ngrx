import { Subscription } from 'rxjs';
import { RecipeService } from 'src/app/core/services/recipe/recipe.service';
import { Recipe } from 'src/app/shared/models/recipe.model';

import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  public recipes: Recipe[];
  private _recipesChangedSubscription: Subscription;

  constructor(
    private _recipeService: RecipeService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
  }

  public ngOnInit(): void {
    this.recipes = this._recipeService.getRecipes();

    this._recipesChangedSubscription = this._recipeService.recipesChanged.subscribe((recipes: Recipe[]) => {
      this.recipes = recipes;
    });
  }

  public ngOnDestroy(): void {
    this._recipesChangedSubscription.unsubscribe();
  }

  public onNewRecipe(): void {
    // tslint:disable-next-line: no-floating-promises
    this._router.navigate(['new'], {
      relativeTo: this._route
    });
  }


}
