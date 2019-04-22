import { Subscription } from 'rxjs';
import { ShoppingListService } from 'src/app/core/services/shopping-list/shopping-list.service';
import { Ingredient } from 'src/app/shared/models/ingredient.model';

import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  public ingredients: Ingredient[];
  private _subscription: Subscription;

  constructor(
    private _shoppingListService: ShoppingListService
  ) {
  }

  public ngOnInit(): void {
    this.ingredients = this._shoppingListService.getIngredients();
    this._subscription = this._shoppingListService.ingredientsChanged
      .subscribe((ingredients: Ingredient[]) => this.ingredients = ingredients);
  }

  public ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  public onEditItem(index: number): void {
    this._shoppingListService.startedEditing.next(index);
  }
}
