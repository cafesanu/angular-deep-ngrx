import { Recipe } from 'src/app/shared/models/recipe.model';

import { Component, Input, OnInit } from '@angular/core';
import { RecipeService } from 'src/app/core/services/recipe/recipe.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
  @Input() public recipeItem: Recipe;

  constructor(
    private _recipeService: RecipeService
  ) {
  }

  public ngOnInit(): void {
  }
}
