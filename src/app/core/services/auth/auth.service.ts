import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _token: string | undefined;

  constructor() { }

  public signUpUser(email: string, password: string): void {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .catch((error: string) => {
        console.log(error);
      });
  }

  public signInUser(email: string, password: string): void {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(() => firebase.auth().currentUser.getIdToken())
      .then((token: string) => {
        this._token = token;
      })
      .catch((error: string) => {
        console.log(error);
      });
  }

  public getToken(): string {
    return this._token;
  }

  public isAuthenticated(): boolean {
    return this._token !== undefined;
  }

  public logout(): void {
    // tslint:disable-next-line: no-floating-promises
    firebase.auth().signOut();
    this._token = undefined;
  }
}
