import {
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GlobalService } from '../service/global.service';
import { HttpResponseType } from '../type';
import { Logger } from '../utils/logger';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {
  private logger: Logger;
  constructor(private global: GlobalService) {
    this.logger = new Logger(this);
  }
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const isFullUrl = request.url.includes('://');
    const requestUrl: string = isFullUrl
      ? request.url
      : request.url.includes('//')
      ? request.url.replace('//', '/') // come from assets url
      : this.global.config.BACKEND_ADDRESS
      ? this.global.config.BACKEND_ADDRESS + request.url
      : request.url;

    this.logger.debug(
      '%c▒▒▓▓%c' + `${request.method}` + ' %c : ' + requestUrl,
      'background:white; color: blue',
      'background:blue; color: white; ',
      'color'
    );

    let httpHeaders: HttpHeaders = new HttpHeaders();
    let responseType: HttpResponseType = 'json';

    if (this.global.session.isLoggedIn) {
      httpHeaders = httpHeaders.append(
        'Authorization',
        `Bearer ${this.global.session.token}`
      );
    }

    request = request.clone({
      url: requestUrl,
      headers: httpHeaders,
      responseType: responseType,
    });

    return next.handle(request);
  }
}
