import { AuthService } from 'src/app/core/services/auth/auth.service';
import { StorageService } from 'src/app/core/services/storage/storage.service';

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(
    private _storageService: StorageService,
    private _authService: AuthService
  ) {}

  public ngOnInit(): void {
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

  public isAuthenticated(): boolean {
    return this._authService.isAuthenticated();
  }
}
