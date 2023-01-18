import { APP_INITIALIZER, Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { AppComponent } from './app.component';
import { httpLoaderFactory, initApp } from './app.factory';
import { appRoutes } from './app.routes';
import { AppService } from './app.service';
import { InterceptorsModule } from './core/interceptors/interceptors.module';
import './core/prototype';
import { SharedModule } from './shared/shared.module';
@NgModule({
  imports: [
    SharedModule,
    BrowserModule,
    NgbModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    InterceptorsModule,
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
  ],
  declarations: [AppComponent],
  providers: [
    AppService,
    {
      provide: APP_INITIALIZER,
      useFactory: initApp,
      deps: [AppService, Injector],
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
