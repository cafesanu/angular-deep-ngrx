import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';

import { AuthRoutingModule } from './auth.routing-module';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './store/auth.effects';

@NgModule({
  declarations: [
    SignInComponent,
    SignUpComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    EffectsModule.forRoot([AuthEffects])
  ]
})
export class AuthModule { }
