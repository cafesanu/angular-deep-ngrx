import { environment } from 'src/environments/environment';

import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AuthModule } from '../auth/auth.module';
import { SharedModule } from '../shared/shared.module';
import { ShoppingModule } from '../shopping/shopping.module';
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
    AuthModule,
    SharedModule,
    ShoppingModule,
    CoreRoutingModule,
    StoreModule.forRoot(coreReducers),
    StoreRouterConnectingModule,
    environment.production
      ? []
      : StoreDevtoolsModule.instrument()
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
