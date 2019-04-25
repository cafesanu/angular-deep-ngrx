import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';

import { SharedModule } from '../shared/shared.module';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { CoreRoutingModule } from './core.routing-module';
import { AuthInterceptorService } from './services/auth-interceptor/auth-interceptor.service';
import { LoggingInterceptorService } from './services/logging-interceptor/logging-interceptor.service';
import { coreReducers } from './store/core.reducers';

@NgModule({
  declarations: [
    HeaderComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    CoreRoutingModule,
    StoreModule.forRoot(coreReducers)
  ],
  exports: [
    CoreRoutingModule,
    HeaderComponent,
    HomeComponent
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoggingInterceptorService,
      multi: true
    }
  ]
})
export class CoreModule { }
