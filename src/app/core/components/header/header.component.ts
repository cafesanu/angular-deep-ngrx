import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import { IAuthState } from 'src/app/auth/store/auth.reducers';
import { StorageService } from 'src/app/core/services/storage/storage.service';
import { ICoreState } from 'src/app/core/store/core.reducers';

import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { LogOutAction } from '../../../auth/store/auth.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public authState$: Observable<IAuthState>;

  constructor(
    private _storageService: StorageService,
    private _store: Store<ICoreState>
  ) {}

  public ngOnInit(): void {
    this.authState$ = this._store.select('auth');
  }

  public onSaveData(): void {
    this._storageService.storeRecipes()
      .subscribe((response: Object) => {
         console.log(response);
      });
  }

  public onFetch(): void {
    this._storageService.getRecipes();
  }

  public onLogout(): void {
    firebase.auth().signOut();
    this._store.dispatch(new LogOutAction());
  }
}
