import { Observable } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth/auth.service';

import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {
  constructor(
    private _authService: AuthService
  ) { }

  // tslint:disable no-any
  public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const copiedRequest: HttpRequest<any> = request.clone({
      params: request.params.set(
        'auth', this._authService.getToken()
      )
    });

    return next.handle(copiedRequest);
  }
}
