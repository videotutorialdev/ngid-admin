import { Table } from '../domain/table';
import { TableColumn } from '../domain/table-column';
import { resolveTableRows } from '../helpers/resolve-table-rows';
import { TableOrderType } from '../type/table-order.type';

export const sortTable = (
  state: Table,
  payload: { column: TableColumn }
): void => {
  if (
    payload.column.model.header &&
    payload.column.sortable &&
    !payload.column.model.childrens
  ) {
    const { field } = payload.column.model;
    const sortOrder: TableOrderType = state.sortField
      ? state.sortField === field
        ? state.sortOrder === 'DESC'
          ? null
          : 'DESC'
        : 'ASC'
      : 'ASC';

    const sortField = sortOrder ? field : null;
    state.sortField = sortField;
    state.sortOrder = sortOrder;

    resolveTableRows(state).then((rows) => {
      state.setRows(rows);
      state.setStateReady();
    });
  } else {
    state.setStateReady();
  }
};
