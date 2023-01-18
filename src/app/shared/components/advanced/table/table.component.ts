import { Component, ContentChild, Input, TemplateRef } from '@angular/core';
import { BaseComponent } from 'src/app/core/base/base-component';
import { PopupService } from '../popup';
import * as tableAction from './actions/table.action';
import { PopupFilterComponent } from './components/popup-filter/popup-filter.component';
import { Table } from './domain/table';
import { TableColumn } from './domain/table-column';
import { TableModel } from './models';
import { TableService } from './table.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  providers: [TableService],
})
export class TableComponent extends BaseComponent {
  @Input() public model: TableModel<any>;
  @Input() public stringUrl: string;
  @Input() public searcPlaceholder: string;

  @ContentChild('actionButtons') actionButtonsTmpl: TemplateRef<any>;
  @ContentChild('filter') filterTempl: TemplateRef<any>;

  public state: Table;

  constructor(
    private _tableService: TableService,
    private _popupService: PopupService
  ) {
    super('table');
  }

  protected onInit(): void {
    this.setStateInitialization();
    this.requestTable();
    this.listenReloadRequest();
    this.setStateReady();
  }

  private setStateInitialization(): void {
    this.state = this._tableService.setState(this.model, this.stringUrl);
  }

  private requestTable(): void {
    this._tableService.dispatch(new tableAction.InitTable());
  }

  private listenReloadRequest(): void {
    this.model.requestReload.subscribe(() => {
      this._tableService.dispatch(new tableAction.ReloadTable());
    });
  }

  public handleSearch(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const keywords = inputElement.value;
    this._tableService.dispatch(new tableAction.SearchTable({ keywords }));
  }

  public handleSort(column: TableColumn): void {
    this._tableService.dispatch(new tableAction.SortTable({ column }));
  }

  public handleChangePerPage(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const perPage = +selectElement.value;
    this._tableService.dispatch(new tableAction.ChangeMaxRowTable({ perPage }));
  }

  public handleChangePage(page: number): void {
    this._tableService.dispatch(new tableAction.ChangePageTable({ page }));
  }

  public handleShowFilter(): void {
    this._popupService.open(
      PopupFilterComponent,
      { filterTempl: this.filterTempl },
      { size: 'SM' }
    );
  }
}
