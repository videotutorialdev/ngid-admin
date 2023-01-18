export class PaginationModel {
  public totalRecords: number;
  constructor(public page: number, public perPage: number, public size = 5) {}

  public setTotalRecords(totalRecords: number): void {
    this.totalRecords = totalRecords;
  }

  public setPage(page: number): void {
    this.page = page;
  }

  public setPerPage(perPage: number): void {
    this.perPage = perPage;
  }
}
