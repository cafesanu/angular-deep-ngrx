import { AuthService } from 'src/app/core/services/auth/auth.service';

import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

interface ISignInData {
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
    private _authService: AuthService
  ) { }

  public ngOnInit(): void {
  }

  public onSignIn(form: NgForm): void {
    const email: string = (<ISignInData> form.value).email;
    const password: string = (<ISignInData> form.value).password;

    this._authService.signInUser(email, password);
  }

}
