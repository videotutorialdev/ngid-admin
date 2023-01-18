import { CurrencyPipe, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { VendorsModule } from 'src/app/shared/vendors/vendors.module';
import { PaginationModule } from '../pagination/pagination.module';
import { ComponentsModule } from './components/components.module';
import { TableComponent } from './table.component';

@NgModule({
  imports: [
    VendorsModule,
    PaginationModule,
    PerfectScrollbarModule,
    ComponentsModule,
  ],
  declarations: [TableComponent],
  providers: [DatePipe, CurrencyPipe],
  exports: [TableComponent],
})
export class TableModule {}
