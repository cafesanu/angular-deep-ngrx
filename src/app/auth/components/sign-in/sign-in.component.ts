import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';

import { ICoreState } from '../../../core/store/core.reducers';
import { TrySignInAction } from '../../store/auth.actions';

export interface ISignInData {
  email: string;
  password: string;
}

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  constructor(
    private _store: Store<ICoreState>
  ) { }

  public ngOnInit(): void {
  }

  public onSignIn(form: NgForm): void {
    const email: string = (<ISignInData> form.value).email;
    const password: string = (<ISignInData> form.value).password;

    this._store.dispatch(new TrySignInAction({ email, password }));
  }
}
