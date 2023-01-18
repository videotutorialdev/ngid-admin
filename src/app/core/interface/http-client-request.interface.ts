import { EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
export interface IHttpClientRequest<T> {
  position: number;
  status: 'ON REQUEST' | 'COMPLETED';
  responseChanges: EventEmitter<T>;
  subject: Subject<T>;
  requestUrl: string;
}
