import { Subscription } from 'rxjs';
import { ICoreState } from 'src/app/core/store/core.reducers';
import { Ingredient } from 'src/app/shared/models/ingredient.model';

import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';

import {
  AddIngredientAction, DeleteIngredientAction, StopEditIngredientAction, UpdateIngredientAction,
} from '../../store/shopping-list.actions';
import { IShoppingListState } from '../../store/shopping-list.reducers';

interface IFormValue {
  name: string;
  amount: number;
}
@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  public editMode: boolean = false;

  @ViewChild('shoppingListForm')
  private _shoppingListForm: NgForm;

  private _editSubscription: Subscription;

  private _itemBeingEdited: Ingredient;

  constructor(
    private _store: Store<ICoreState>
  ) { }

  public ngOnInit(): void {
    this._editSubscription = this._store.select('shoppingList')
      .subscribe((data: IShoppingListState) => {
        if (data.editedIngredientIndex !== null) {
          this._itemBeingEdited = data.editedIngredient;
          this.editMode = true;
          this._shoppingListForm.setValue({
            name: this._itemBeingEdited.name,
            amount: this._itemBeingEdited.amount
          });
        } else {
          this._itemBeingEdited = data.editedIngredient;
          this.editMode = false;
        }
      });
  }

  public ngOnDestroy(): void {
    this._editSubscription.unsubscribe();
    this._store.dispatch(new StopEditIngredientAction());
  }

  public onSubmit(): void {
    const value: IFormValue = <IFormValue> this._shoppingListForm.value;
    const newIngredient: Ingredient = new Ingredient(value.name, value.amount);

    if (this.editMode) {
      this._store.dispatch(new UpdateIngredientAction({
        ingredient: newIngredient
      }));
    } else {
      this._store.dispatch(new AddIngredientAction({
        ingredient: newIngredient
      }));
    }

    this._shoppingListForm.reset();
    this.editMode = false;
  }

  public onDelete(): void {
    if (this.editMode) {
      this._store.dispatch(new DeleteIngredientAction());
      this._shoppingListForm.reset();
      this.editMode = false;
    }
  }

  public onClear(): void {
    this._shoppingListForm.reset();
    this.editMode = false;
  }
}
