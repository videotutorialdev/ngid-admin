import { Table } from '../domain/table';
import { TableRow } from '../domain/table-row';
import { resolveTableRows } from '../helpers/resolve-table-rows';

export const changePageTableAction = (
  state: Table,
  payload: { page: number }
): void => {
  state.pagination.setPage(payload.page);
  resolveTableRows(state).then((rows: Array<TableRow>) => {
    state.setRows(rows);
    state.setStateReady();
  });
};
