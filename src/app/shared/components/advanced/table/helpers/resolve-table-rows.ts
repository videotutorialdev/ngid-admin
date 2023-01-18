import { HttpClient, HttpResponse } from '@angular/common/http';
import { Service } from 'src/app/core/utils/service';
import { ObjectHelper } from 'src/app/shared/helpers/object.helper';
import { ToastService } from '../../toast/toast.service';
import { Table } from '../domain/table';
import { TableRow } from '../domain/table-row';
import { TableColumnModel } from '../models';
import { TableOrderType } from '../type';
export const resolveTableRows = (state: Table): Promise<Array<TableRow>> => {
  return new Promise((resolve) => {
    if (state.isServerSide) {
      const httpClient = Service.injector.get(HttpClient);
      const { page, perPage } = state.pagination;
      let query = `_page=${page}&_limit=${perPage}`;
      if (state.keywords) {
        query += `&q=${state.keywords}`;
      }

      query += `&_sort=${state.sortField || 'create_at'}&_order=${
        state.sortOrder?.toLowerCase() || 'desc'
      }`;

      if (state.model.customData) {
        Object.keys(state.model.customData || {}).forEach((key: string) => {
          const value = (state.model.customData as { [key: string]: any })[key];
          if (value) {
            query += `&${key}=${value}`;
          }
        });
      }

      httpClient
        .get<any>(`${state.stringUrl}?${query}`, { observe: 'response' })
        .subscribe({
          next: (response: HttpResponse<Array<any>>) => {
            const count: string | null = response.headers.get('X-Total-Count');
            state.pagination.setTotalRecords(count ? +count : 0);
            resolve(resolveRows(state, response.body as Array<any>));
          },
          error: (errorResponse) => {
            const toastService = Service.injector.get(ToastService);
            toastService.showError(errorResponse.message.split(':').pop());
            resolve([]);
          },
        });
    } else {
      if (state.model.records.length === 0) return resolve([]);

      let records = state.model.records;

      records = searchRecordByKeywords(
        records,
        state.columnsModel,
        state.keywords
      );

      records = orderRecords(records, state.sortField, state.sortOrder);

      state.pagination.setTotalRecords(records.length);

      const { perPage, page } = state.pagination;

      const startRow = (page - 1) * perPage;
      const endRow = page * perPage;

      records = records.splice(startRow, endRow);

      resolve(resolveRows(state, records));
    }
  });
};

const searchRecordByKeywords = (
  records: Array<any>,
  columns: Array<TableColumnModel>,
  keywords: string
): Array<any> => {
  if (!keywords) return records;
  return records.filter((record) => {
    let isMatch = false;
    columns.forEach((column) => {
      if (isMatch) return;
      const value: string = ObjectHelper.resolveValue(
        record,
        column.field as string
      );
      if (value && value.toLowerCase().includes(keywords.toLowerCase())) {
        isMatch = true;
      }
    });
    return isMatch;
  });
};

const orderRecords = (
  records: Array<any>,
  sortField: string | null | undefined,
  orderBy: TableOrderType
): Array<any> => {
  if (!sortField) return records;
  return records.sort((recordA, recordB) => {
    const valueA = ObjectHelper.resolveValue(recordA, sortField);
    const valueB = ObjectHelper.resolveValue(recordB, sortField);
    if (valueA && valueB) {
      if (valueA < valueB) return orderBy === 'ASC' ? -1 : +1;
      return orderBy === 'ASC' ? +1 : -1;
    }
    return 0;
  });
};

const resolveRows = (state: Table, records: Array<any>): Array<TableRow> => {
  const startRow = (state.pagination.page - 1) * state.pagination.perPage;
  return records.map((record, index: number) =>
    TableRow.create(
      { record: record, columns: state.columnsModel },
      index + 1 + startRow
    )
  );
};
