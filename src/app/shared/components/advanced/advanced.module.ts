import { NgModule } from '@angular/core';
import { LangSwitcherModule } from './lang-switcher/lang-switcher.module';
import { ModalModule } from './modal';
import { PopupSharedModule } from './popup';
import { TableModule } from './table/table.module';
import { ToastModule } from './toast/toast.module';

@NgModule({
  exports: [
    TableModule,
    PopupSharedModule,
    ModalModule,
    ToastModule,
    LangSwitcherModule,
  ],
})
export class AdvancedModule {}
