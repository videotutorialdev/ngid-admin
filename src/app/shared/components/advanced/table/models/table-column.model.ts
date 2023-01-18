import { TableColumnType } from '../type';
import { AllTableColumnTypeModel } from './table-column-type.model';

export class TableColumnModel {
  public field: string;
  public header: string;
  public sortable?: boolean;
  public childrens?: Array<TableColumnModel>;
  public type?: TableColumnType | AllTableColumnTypeModel;
  public callbacks?: {
    format?: (props: { value: any; record: any }) => any;
  };
}
