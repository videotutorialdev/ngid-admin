import { PaginationModel } from '../../pagination';
import { TableColumnModel, TableModel } from '../models';
import { TableOrderType } from '../type';
import { TableColumn } from './table-column';
import { TableRow } from './table-row';

export class Table {
  public rows: Array<TableRow>;
  public columnsList: Array<Array<TableColumn>>;
  public columnsModel: Array<TableColumnModel>;
  public isLoading: boolean;
  public keywords: string;
  public perPages: Array<number>;
  public sortField: string | null | undefined;
  public sortOrder: TableOrderType;
  public pagination: PaginationModel;
  public isServerSide: boolean;
  constructor(public model: TableModel<any>, public stringUrl?: string) {}

  public setStateLoading(): void {
    this.isLoading = true;
  }

  public setStateReady(): void {
    this.isLoading = false;
  }

  public setRows(rows: Array<TableRow>): void {
    this.rows = rows;
  }

  public static create(model: TableModel<any>, stringUrl?: string): Table {
    const table = new Table(model, stringUrl);
    table.rows = new Array();
    table.perPages = [5, 10, 25];
    table.isServerSide = !!stringUrl;
    table.columnsList = this.createColumnsList(model.columns, [], 0);
    table.columnsModel = this.createColumnsModel(model.columns, []);
    table.pagination = new PaginationModel(1, 10);
    table.keywords = model.keywords || '';
    return table;
  }

  public static createColumnsList(
    columns: Array<TableColumnModel>,
    results: Array<Array<TableColumn>>,
    index: number
  ): Array<Array<TableColumn>> {
    if (!results[index]) results.push([]);
    columns.forEach((column, columnIndex) => {
      results[index].push(TableColumn.create(column, null, columnIndex + 1));
      if (column.childrens) {
        this.createColumnsList(column.childrens, results, index + 1);
      }
    });
    return results;
  }

  public static createColumnsModel(
    columns: Array<TableColumnModel>,
    result: Array<TableColumnModel>
  ): Array<TableColumnModel> {
    columns.forEach((column) => {
      column.childrens
        ? this.createColumnsModel(column.childrens, result)
        : result.push(column);
    });
    return result;
  }
}
