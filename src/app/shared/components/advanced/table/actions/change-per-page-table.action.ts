import { Table } from '../domain/table';
import { TableRow } from '../domain/table-row';
import { resolveTableRows } from '../helpers/resolve-table-rows';

export const changePerPageTableAction = (
  state: Table,
  payload: { perPage: number }
): void => {
  state.pagination.setPerPage(payload.perPage);
  resolveTableRows(state).then((rows: Array<TableRow>) => {
    state.setRows(rows);
    state.setStateReady();
  });
};
