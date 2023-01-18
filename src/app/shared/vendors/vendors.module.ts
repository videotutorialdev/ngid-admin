import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, NgbModule, TranslateModule],
  exports: [CommonModule, ReactiveFormsModule, NgbModule, TranslateModule],
})
export class VendorsModule {}
