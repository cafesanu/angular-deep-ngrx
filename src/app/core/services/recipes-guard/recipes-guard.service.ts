import { Observable } from 'rxjs';

import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RecipesGuardService implements CanLoad {
  constructor() {}

  public canLoad(
    route: Route, // tslint:disable-line no-unused
    segments: UrlSegment[] // tslint:disable-line no-unused
  ): boolean | Observable<boolean> | Promise<boolean> {
    return true;
  }
}
