import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class InitService {
  constructor() {
  }

  public init(): Promise<void> {
    return new Promise<void>(
      (resolve: (value?: void | PromiseLike<void>) => void): void => {
        firebase.initializeApp({
          apiKey: 'AIzaSyAPRtpafeBDxX-UdTRl06Tx1yWOARe_kbI',
          authDomain: 'ng-recipe-name.firebaseapp.com'
        });
        resolve();
      }
    );
  }
}
