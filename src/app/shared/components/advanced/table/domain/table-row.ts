import { TableColumnModel } from '../models';
import { TableRowModel } from '../models/table-row.model';
import { TableColumn } from './table-column';

export class TableRow {
  public columns: Array<TableColumn>;
  public position: number;
  constructor(public model: TableRowModel) {}

  public static create(model: TableRowModel, position: number): TableRow {
    const tableRow = new TableRow(model);
    tableRow.position = position;
    tableRow.columns = model.columns.map(
      (column: TableColumnModel, index: number) =>
        TableColumn.create(column, model.record, index + 1)
    );
    return tableRow;
  }
}
