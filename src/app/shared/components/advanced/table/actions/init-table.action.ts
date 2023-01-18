import { Table } from '../domain/table';
import { TableRow } from '../domain/table-row';
import { resolveTableRows } from '../helpers/resolve-table-rows';

export const initTableAction = (state: Table): void => {
  resolveTableRows(state).then((rows: Array<TableRow>) => {
    state.setRows(rows);
    state.setStateReady();
  });
};
