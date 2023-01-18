import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BaseComponent } from 'src/app/core/base/base-component';
import { PaginationModel } from './models';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent extends BaseComponent {
  @Input() model: PaginationModel;
  @Output() onChangePage: EventEmitter<number>;
  constructor() {
    super('app.pagination');
    this.onChangePage = new EventEmitter();
  }

  protected onInit(): void {
    this.setStateReady();
  }

  public handleChangePage(event: Event, page: number): void {
    event?.preventDefault();
    this.onChangePage.emit(+page);
  }

  public handleBackPage(event: Event): void {
    event.preventDefault();
    if (this.model.page <= 1) return;
    const currentPage = this.model.page - 1;
    this.model.setPage(currentPage);
    this.onChangePage.emit(currentPage);
  }

  public handleNextPage(event: Event): void {
    event.preventDefault();
    if (this.model.page >= this.paging.lastPage) return;
    const currentPage = this.model.page + 1;
    this.model.setPage(currentPage);
    this.onChangePage.emit(currentPage);
  }

  public get paging(): {
    firstPage: number;
    endPage: number;
    lastPage: number;
    startPage: number;
  } {
    const firstPage = 1;
    const lastPage =
      Math.ceil(this.model.totalRecords / this.model.perPage) || 1;

    const startPage =
      this.model.page -
      Math.floor(this.model.size / 2) +
      (this.model.size % 2 === 0 ? 1 : 0);
    const endPage = this.model.page + Math.floor(this.model.size / 2);

    return {
      firstPage,
      lastPage,
      startPage:
        startPage < firstPage
          ? firstPage
          : startPage > lastPage - this.model.size
          ? lastPage - this.model.size + 1
          : startPage,
      endPage:
        endPage > lastPage
          ? lastPage
          : endPage < this.model.size
          ? this.model.size > lastPage
            ? lastPage
            : this.model.size
          : endPage,
    };
  }

  public get pages(): Array<number> {
    return Array(this.paging.endPage - (this.paging.startPage - 1))
      .fill(0)
      .map((fill, index) => fill + index + this.paging.startPage);
  }
}
