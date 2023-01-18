import { EventEmitter } from '@angular/core';
import { IObject } from 'src/app/core/interface';
import { TableColumnModel } from './table-column.model';
export class TableModel<T> {
  private _records: Array<T>;
  public customData: IObject;
  public requestReload: EventEmitter<void>;
  public keywords: string;
  constructor(
    public moduleCode: string,
    public columns: Array<TableColumnModel>
  ) {
    this.requestReload = new EventEmitter();
  }

  public get records(): Array<T> {
    return Array.from(this._records);
  }

  public set records(records: Array<T>) {
    this._records = records;
  }

  public setCustomData(customData: IObject): void {
    this.customData = customData;
  }

  public setKeywords(keywords: string): void {
    this.keywords = keywords;
  }

  public reload(): void {
    this.requestReload.emit();
  }
}
