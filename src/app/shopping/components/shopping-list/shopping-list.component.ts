import { Observable } from 'rxjs';
import { ICoreState } from 'src/app/core/store/core.reducers';
import { IShoppingListState } from 'src/app/shopping/store/shopping-list.reducers';

import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { StartEditIngredientAction } from '../../store/shopping-list.actions';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  public shoppingListState$: Observable<IShoppingListState>;

  constructor(
    private _store: Store<ICoreState>
  ) {
  }

  public ngOnInit(): void {
    this.shoppingListState$ = this._store.select('shoppingList');
  }

  public onEditItem(index: number): void {
    this._store.dispatch(new StartEditIngredientAction({
      index: index
    }));
  }
}
