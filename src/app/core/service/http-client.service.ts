import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { map, Observable, Subject, takeUntil } from 'rxjs';
import { IHttpClientRequest } from '../interface';
@Injectable({
  providedIn: 'root',
})
export class HttpClientService {
  public httpClientRequests: Array<IHttpClientRequest<any>>;
  public completedRequestChanges: EventEmitter<void>;
  public timeOut: any;
  constructor(public httpClient: HttpClient) {
    this.httpClientRequests = new Array();
    this.completedRequestChanges = new EventEmitter();
  }

  public post<T>(url: string, body: any, options: object = {}): Observable<T> {
    const subject: Subject<T> = new Subject();
    const httpClientRequest: IHttpClientRequest<T> = {
      position: this.httpClientRequests.length,
      status: 'ON REQUEST',
      responseChanges: new EventEmitter(),
      subject: subject,
      requestUrl: url,
    };
    this.httpClientRequests.push(httpClientRequest);
    return this.httpClient
      .post<T>(url, body, options)
      .pipe(takeUntil(subject))
      .pipe(
        map((event: T) => {
          httpClientRequest.status = 'COMPLETED';
          this.emitRequestChanges();
          return event;
        })
      );
  }

  public get<T>(url: string, options: object = {}): Observable<T> {
    const subject: Subject<T> = new Subject();
    const httpClientRequest: IHttpClientRequest<T> = {
      position: this.httpClientRequests.length,
      status: 'ON REQUEST',
      responseChanges: new EventEmitter(),
      subject: subject,
      requestUrl: url,
    };
    this.httpClientRequests.push(httpClientRequest);
    return this.httpClient
      .get<T>(encodeURI(url), options)
      .pipe(takeUntil(subject))
      .pipe(
        map((event) => {
          httpClientRequest.status = 'COMPLETED';
          this.emitRequestChanges();
          return event;
        })
      );
  }

  public put<T>(url: string, body: any, options: object = {}): Observable<T> {
    const subject: Subject<T> = new Subject();
    const httpClientRequest: IHttpClientRequest<T> = {
      position: this.httpClientRequests.length,
      status: 'ON REQUEST',
      responseChanges: new EventEmitter(),
      subject: subject,
      requestUrl: url,
    };
    this.httpClientRequests.push(httpClientRequest);
    return this.httpClient
      .put<T>(url, body, options)
      .pipe(takeUntil(subject))
      .pipe(
        map((event: T) => {
          httpClientRequest.status = 'COMPLETED';
          this.emitRequestChanges();
          return event;
        })
      );
  }

  public delete<T>(url: string, options: object = {}): Observable<T> {
    const subject: Subject<T> = new Subject();
    const httpClinetRequest: IHttpClientRequest<T> = {
      position: this.httpClientRequests.length,
      status: 'ON REQUEST',
      responseChanges: new EventEmitter(),
      subject: subject,
      requestUrl: url,
    };
    this.httpClientRequests.push(httpClinetRequest);
    return this.httpClient
      .delete<T>(url, options)
      .pipe(takeUntil(subject))
      .pipe(
        map((event: T) => {
          httpClinetRequest.status = 'COMPLETED';
          this.emitRequestChanges();
          return event;
        })
      );
  }

  public request<T>(request: HttpRequest<any>): Observable<T | HttpEvent<T>> {
    const subject: Subject<T> = new Subject();
    const httpClinetRequest: IHttpClientRequest<T> = {
      position: this.httpClientRequests.length,
      status: 'ON REQUEST',
      responseChanges: new EventEmitter(),
      subject: subject,
      requestUrl: request.url,
    };
    this.httpClientRequests.push(httpClinetRequest);
    return this.httpClient
      .request<T>(request)
      .pipe(takeUntil(subject))
      .pipe(
        map((event: HttpEvent<T>) => {
          httpClinetRequest.status = 'COMPLETED';
          this.emitRequestChanges();
          return event;
        })
      );
  }

  public reset(): void {
    this.httpClientRequests.splice(0);
  }

  public unsubscribe(): void {
    this.httpClientRequests.forEach(
      (httpClientRequest: IHttpClientRequest<any>) => {
        httpClientRequest.subject.next([]);
        httpClientRequest.subject.unsubscribe();
      }
    );
    this.reset();
  }

  private emitRequestChanges(): void {
    clearTimeout(this.timeOut);
    this.timeOut = setTimeout(() => {
      const isCompleteRequest =
        this.httpClientRequests.filter(
          (httpClinetRequest) => httpClinetRequest.status === 'ON REQUEST'
        ).length === 0;
      if (isCompleteRequest) {
        this.completedRequestChanges.emit();
      }
    }, 500);
  }
}
