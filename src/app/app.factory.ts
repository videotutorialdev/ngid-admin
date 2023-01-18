import { HttpClient } from '@angular/common/http';
import { Injector } from '@angular/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AppService } from './app.service';

export function initApp(appService: AppService, injector: Injector): object {
  return async () => await appService.initializeApp(injector);
}

export function httpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, '//assets/lang/', '.json');
}
