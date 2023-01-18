import { animate, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BaseComponent } from 'src/app/core/base/base-component';
import { ToastOptions } from './toast-options';

@Component({
  templateUrl: './toast.component.html',
  animations: [
    trigger('animated', [
      transition('void <=> *', [
        style({
          opacity: 0,
        }),
        animate(2000),
      ]),
    ]),
  ],
})
export class ToastComponent extends BaseComponent {
  @Input() message: string;
  @Input() options: ToastOptions;

  @Output() onClose: EventEmitter<void>;
  constructor() {
    super('toast');
    this.onClose = new EventEmitter();
  }

  protected onInit(): void {
    this.setStateReady();
  }
}
