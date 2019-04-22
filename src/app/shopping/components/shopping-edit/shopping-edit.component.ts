import { Subscription } from 'rxjs';
import { ShoppingListService } from 'src/app/core/services/shopping-list/shopping-list.service';
import { Ingredient } from 'src/app/shared/models/ingredient.model';

import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

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

  private _itemBeingEditedIndex: number;

  private _itemBeingEdited: Ingredient;

  constructor(
    private _shoppingListService: ShoppingListService
  ) { }

  public ngOnInit(): void {
    this._editSubscription = this._shoppingListService.startedEditing.subscribe((index: number) => {
      this._itemBeingEditedIndex = index;
      this.editMode = true;
      this._itemBeingEdited = this._shoppingListService.getIngredient(index);
      this._shoppingListForm.setValue({
        name: this._itemBeingEdited.name,
        amount: this._itemBeingEdited.amount
      });
    });
  }

  public ngOnDestroy(): void {
    this._editSubscription.unsubscribe();
  }

  public onSubmit(): void {
    const value: IFormValue = <IFormValue> this._shoppingListForm.value;
    const newIngredient: Ingredient = new Ingredient(value.name, value.amount);

    if (this.editMode) {
      this._shoppingListService.updateIngredient(this._itemBeingEditedIndex, newIngredient);
    } else {
      this._shoppingListService.addIngredient(newIngredient);
    }

    this._shoppingListForm.reset();
    this.editMode = false;
  }

  public onDelete(): void {
    if (this.editMode) {
      this._shoppingListService.deleteIngredient(this._itemBeingEditedIndex);
      this._shoppingListForm.reset();
      this.editMode = false;
    }
  }

  public onClear(): void {
    this._shoppingListForm.reset();
    this.editMode = false;
  }
}
