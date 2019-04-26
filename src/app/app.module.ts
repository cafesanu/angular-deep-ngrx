import { HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { InitService } from './core/services/init/init.service';

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
    CoreModule
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
