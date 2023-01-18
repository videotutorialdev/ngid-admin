import { CurrencyPipe, DatePipe } from '@angular/common';
import { Constant } from 'src/app/core/domain';
import { Service } from 'src/app/core/utils/service';
import { ObjectHelper } from 'src/app/shared/helpers/object.helper';
import { TableColumnModel } from '../models';
import {
  AllTableColumnTypeModel,
  TypeCurrencyModel,
  TypeDateModel,
} from '../models/table-column-type.model';
import { TableColumnType } from '../type';

export class TableColumn {
  public value: any;
  public sortable: boolean;
  constructor(
    public model: TableColumnModel,
    public position: number,
    public record: any
  ) {}

  public static create(
    model: TableColumnModel,
    record: any,
    position: number
  ): TableColumn {
    const tableColumn = new TableColumn(model, position, record);
    tableColumn.sortable = model.sortable !== false;
    tableColumn.value = this.formatValue(
      record && model.field
        ? ObjectHelper.resolveValue(record, model.field)
        : null,
      model.type
    );
    return tableColumn;
  }

  public static formatValue(
    value: any,
    type?: TableColumnType | AllTableColumnTypeModel
  ): any {
    if (!value || !type) return value;
    if (type === 'date' || type instanceof TypeDateModel) {
      const datePipe = Service.injector.get(DatePipe);
      if (typeof type === 'string') {
        type = {
          name: 'date',
          format: new Constant().DATE_FORMAT_LONG,
        };
      }
      return datePipe.transform(value, type.format);
    } else if (type instanceof TypeCurrencyModel || type === 'currency') {
      const currency = Service.injector.get(CurrencyPipe);
      if (typeof type === 'string') {
        type = {
          name: 'currency',
          currencyCode: '',
          display: new Constant().CURRENCY_DISPLAY,
          digitsInfo: new Constant().CURRENCY_DIGITS_INFO,
        };
      }
      return currency.transform(
        value,
        type.currencyCode,
        type.display,
        type.digitsInfo
      );
    }
    return value;
  }
}
