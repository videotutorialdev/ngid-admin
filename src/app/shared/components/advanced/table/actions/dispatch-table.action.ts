import { Table } from '../domain/table';
import { changePageTableAction } from './change-page-table.action';
import { changePerPageTableAction } from './change-per-page-table.action';
import { initTableAction } from './init-table.action';
import { reloadTableAction } from './reload-table.action';
import { searchTableAction } from './search-table.action';
import { sortTable } from './sort-table.action';
import * as tableAction from './table.action';

export const dispatchTableAction = (
  state: Table,
  action: tableAction.AllTableAction
): void => {
  switch (action.type) {
    case tableAction.INIT_TABLE:
      initTableAction(state);
      break;
    case tableAction.RELOAD_TABLE:
      reloadTableAction(state);
      break;
    case tableAction.SEARCH_TABLE:
      searchTableAction(state, action.payload);
      break;
    case tableAction.CHANGE_PER_PAGE_TABLE:
      changePerPageTableAction(state, action.payload);
      break;
    case tableAction.SORT_TABLE:
      sortTable(state, action.payload);
      break;
    case tableAction.CHANGE_PAGE_TABLE:
      changePageTableAction(state, action.payload);
      break;
    default:
      break;
  }
};
