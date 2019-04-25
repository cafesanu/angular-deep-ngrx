import { Observable } from 'rxjs';
import { IAuthState } from 'src/app/auth/store/auth.reducers';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { StorageService } from 'src/app/core/services/storage/storage.service';
import { ICoreState } from 'src/app/core/store/core.reducers';

import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public authState$: Observable<IAuthState>;

  constructor(
    private _storageService: StorageService,
    private _authService: AuthService,
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
    this._authService.logout();
  }
}
