import { Observable, Subscription } from 'rxjs';
import { ShoppingListService } from 'src/app/core/services/shopping-list/shopping-list.service';
import { Ingredient } from 'src/app/shared/models/ingredient.model';

import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { IShoppingListState } from '../../store/reducers/shopping-list/shopping-list.reducer';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  public shoppingListState$: Observable<IShoppingListState>;

  constructor(
    private _shoppingListService: ShoppingListService,
    private _store: Store<{
      shoppingList: IShoppingListState;
    }>
  ) {
  }

  public ngOnInit(): void {
    this.shoppingListState$ = this._store.select('shoppingList');
  }

  public onEditItem(index: number): void {
    this._shoppingListService.startedEditing.next(index);
  }
}
