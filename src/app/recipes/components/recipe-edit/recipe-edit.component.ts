import { RecipeService } from 'src/app/core/services/recipe/recipe.service';
import { Ingredient } from 'src/app/shared/models/ingredient.model';
import { Recipe } from 'src/app/shared/models/recipe.model';

import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

interface IRecipeData {
  name: string;
  imagePath: string;
  description: string;
  ingredients: IIngredientData[];
}
interface IIngredientData {
  name: string;
  amount: number;
}

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  public recipeForm: FormGroup;
  public ingredientsArrayForm: FormArray;

  private _id: number;

  private _editMode: boolean;

  constructor(
    private _route: ActivatedRoute,
    private _recipeService: RecipeService,
    private _router: Router
  ) { }

  public ngOnInit(): void {
    this._route.params
      .subscribe((params: Params) => {
        this._id = Number(params.id);
        this._editMode = !isNaN(this._id);
        this._initForm();
      });
  }

  public onSubmit(): void {
    const data: IRecipeData = <IRecipeData> this.recipeForm.value;

    const recipe: Recipe = new Recipe(
      data.name,
      data.description,
      data.imagePath,
      data.ingredients
    );

    if (this._editMode) {
      recipe.id = this._id;
      this._recipeService.editRecipe(recipe);
    } else {
      this._recipeService.addRecipe(recipe);
    }
    this._goBack();
  }

  public onAddIngredient(): void {
    this.ingredientsArrayForm.push(new FormGroup({
      name: new FormControl(null, [Validators.required]),
      amount: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^[1-9]+[0-9]*$/)
      ])
    }));
  }

  public onCancel(): void {
    this._goBack();
  }
  public onRemoveIngredient(index: number): void {
    this.ingredientsArrayForm.removeAt(index);
  }

  private _goBack(): void {
    // tslint:disable-next-line: no-floating-promises
    this._router.navigate(['../'], {
      relativeTo: this._route
    });
  }

  private _initForm(): void {
    const recipeData: IRecipeData = {
      name: '',
      imagePath: '',
      description: '',
      ingredients: []
    };

    if (this._editMode) {
      const recipe: Recipe = this._recipeService.getRecipe(this._id);

      recipeData.name = recipe.name;
      recipeData.imagePath = recipe.imagePath;
      recipeData.description = recipe.description;
      recipeData.ingredients = recipe.ingredients.map((ingredient: Ingredient) => ({
        name: ingredient.name,
        amount: ingredient.amount
      }));
    }

    this.ingredientsArrayForm = new FormArray(
      recipeData.ingredients.map((ingredientData: IIngredientData) => new FormGroup({
        name: new FormControl(ingredientData.name, [Validators.required]),
        amount: new FormControl(ingredientData.amount, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)
        ])
      }))
    );

    this.recipeForm = new FormGroup({
      name: new FormControl(recipeData.name, [Validators.required]),
      imagePath: new FormControl(recipeData.imagePath, [Validators.required]),
      description: new FormControl(recipeData.description, [Validators.required]),
      ingredients: this.ingredientsArrayForm
    });
  }
}
