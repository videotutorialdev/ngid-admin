import { Table } from '../domain/table';
import { TableRow } from '../domain/table-row';
import { resolveTableRows } from '../helpers/resolve-table-rows';

export const searchTableAction = (
  state: Table,
  payload: { keywords: string }
): void => {
  state.keywords = payload.keywords;
  state.model.setKeywords(payload.keywords);
  state.pagination.setPage(1);
  resolveTableRows(state).then((rows: Array<TableRow>) => {
    state.setRows(rows);
    state.setStateReady();
  });
};
