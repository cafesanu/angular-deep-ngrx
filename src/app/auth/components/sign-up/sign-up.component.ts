import { AuthService } from 'src/app/core/services/auth/auth.service';

import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

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
    private _authService: AuthService
  ) {
  }

  public ngOnInit(): void {
  }

  public onSignUp(form: NgForm): void {
    const email: string = (<ISignUpData> form.value).email;
    const password: string = (<ISignUpData> form.value).password;

    this._authService.signUpUser(email, password);
  }

}
