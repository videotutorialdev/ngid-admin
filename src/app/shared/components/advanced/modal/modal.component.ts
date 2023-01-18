import { Component, EventEmitter, Input, Output } from '@angular/core';
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
})
export class ModalComponent {
  @Input() public header: string | null;
  @Input() public message: string | null;
  @Input() public positiveButton: string | null;
  @Input() public negativeButton: string | null;
  @Output() public onChange: EventEmitter<boolean>;
  @Output() public onDismiss: EventEmitter<boolean>;
  constructor() {
    this.onChange = new EventEmitter();
    this.onDismiss = new EventEmitter();
    this.header = null;
    this.message = null;
    this.positiveButton = null;
    this.negativeButton = null;
  }
}
