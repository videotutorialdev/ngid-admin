import { IAction } from 'src/app/core/interface';
import { TableColumn } from '../domain/table-column';

export const INIT_TABLE = `[ Ngid Table ]: Initialization table`;
export const RELOAD_TABLE = `[ Ngid Table ]: Reload table`;
export const SEARCH_TABLE = `[ Ngid Table ]: Search table`;
export const CHANGE_PER_PAGE_TABLE = `[ Ngid Table ]: Change per page table`;
export const SORT_TABLE = `[ Ngid Table ]: Sort table`;
export const CHANGE_PAGE_TABLE = `[ Ngid Table ]: Change page table`;

export class InitTable implements IAction<void> {
  public readonly type = INIT_TABLE;
}

export class ReloadTable implements IAction<void> {
  public readonly type = RELOAD_TABLE;
}

export class SearchTable implements IAction<{ keywords: string }> {
  public readonly type = SEARCH_TABLE;
  constructor(public payload: { keywords: string }) {}
}

export class ChangeMaxRowTable implements IAction<{ perPage: number }> {
  public readonly type = CHANGE_PER_PAGE_TABLE;
  constructor(public payload: { perPage: number }) {}
}

export class SortTable implements IAction<{ column: TableColumn }> {
  public readonly type = SORT_TABLE;
  constructor(public payload: { column: TableColumn }) {}
}

export class ChangePageTable implements IAction<{ page: number }> {
  public readonly type = CHANGE_PAGE_TABLE;
  constructor(public payload: { page: number }) {}
}

export type AllTableAction =
  | InitTable
  | ReloadTable
  | SearchTable
  | ChangeMaxRowTable
  | SortTable
  | ChangePageTable;
