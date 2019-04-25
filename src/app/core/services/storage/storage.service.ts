import { Observable } from 'rxjs';
import { Recipe } from 'src/app/shared/models/recipe.model';

import { HttpClient, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { RecipeService } from '../recipe/recipe.service';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private _url: string = 'https://ng-recipe-name.firebaseio.com/ng-recipe-name.json';

  constructor(
    private _httpClient: HttpClient,
    private _recipeService: RecipeService
  ) { }

  public storeRecipes(): Observable<Object> {
    // tslint:disable no-commented-out-code
    // return this._httpClient.put(
    //   this._url,
    //   this._recipeService.getRecipes(), {
    //     params: new HttpParams().set('auth', token)
    //   }
    // );
    const request: HttpRequest<Recipe[]> = new HttpRequest<Recipe[]>(
      'PUT',
      this._url,
      this._recipeService.getRecipes(), {
        reportProgress: true
      }
    );

    return this._httpClient.request(request);
  }

  public getRecipes(): void {
    this._httpClient.get<Recipe[]>(this._url)
      .subscribe((recipes: Recipe[]) => {
        this._recipeService.setRecipes(recipes);

        return recipes;
      });
  }
}
