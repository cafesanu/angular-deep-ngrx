import {StoreModule} from '@ngrx/store';
import { HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { CoreModule } from './core/core.module';
import { InitService } from './core/services/init/init.service';
import { SharedModule } from './shared/shared.module';
import { shoppingListReducer } from './shopping/store/reducers/shopping-list/shopping-list.reducer';

export function initializeApp(initService: InitService): () => Promise<void> {
  return (): Promise<void> => {
    return initService.init();
  };
}
@NgModule({
  declarations: [ // Components, directives, and pipes
    AppComponent
  ],
  imports: [ // other modules
    BrowserModule, // common module + additional features only needed when the app starts
    HttpClientModule,
    AuthModule,
    SharedModule,
    CoreModule,
    StoreModule.forRoot({
      shoppingList: shoppingListReducer
    })
  ],
  providers: [ // services
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [InitService],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
