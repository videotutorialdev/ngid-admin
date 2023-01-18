import {
  HttpErrorResponse,
  HttpEvent,
  HttpEventType,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { GlobalService } from '../service/global.service';
import { Logger } from '../utils/logger';

@Injectable()
export class ResponseInterceptor implements HttpInterceptor {
  private logger: Logger;
  constructor(private global: GlobalService, private router: Router) {
    this.logger = new Logger(this);
  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      tap({
        next: this.handleHttpResponse.bind(this),
        error: (error: HttpErrorResponse) => {
          if (error.status !== 400 && error.status !== 200) {
            this.handleHttpError(error);
          }
        },
      })
    );
  }

  private handleHttpResponse(event: HttpEvent<any>): void {
    switch (event.type) {
      case HttpEventType.UploadProgress:
        break;
      case HttpEventType.ResponseHeader:
        break;
      case HttpEventType.Response:
        this.logger.debug(
          '%c Response %c ▒▒▓▓%c : ' + event.status,
          'background:green; color: white',
          'background:green; color: white; font-weight: bold ',
          'color: blue'
        );
        this.logger.debug(event);
        break;
      case HttpEventType.Sent:
        break;
      case HttpEventType.DownloadProgress:
        break;
      case HttpEventType.User:
        break;
      default:
        console.log(event);
    }
  }

  private handleHttpError(errorResponse: HttpErrorResponse): void {
    if (errorResponse.status >= 500 || errorResponse.status === 0) {
      this.router.navigate(['/error/500']);
    } else if (errorResponse.status === 401) {
      // kick user and redirect to login page
      this.global.session.destroy();
      this.router.navigate(['/auth/sign-in']);
    }
  }
}
