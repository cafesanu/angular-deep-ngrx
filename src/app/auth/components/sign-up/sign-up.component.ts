import { ICoreState } from 'src/app/core/store/core.reducers';

import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';

import { TrySignUpAction } from '../../store/auth.actions';

interface ISignUpData {
  email: string;
  password: string;
}

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  constructor(
    private _store: Store<ICoreState>
  ) {
  }

  public ngOnInit(): void {
  }

  public onSignUp(form: NgForm): void {
    const email: string = (<ISignUpData> form.value).email;
    const password: string = (<ISignUpData> form.value).password;

    this._store.dispatch(new TrySignUpAction({ email, password }));
  }

}
