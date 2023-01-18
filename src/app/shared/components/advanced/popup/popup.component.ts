import {
  Component,
  ContentChild,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
} from '@angular/core';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss'],
})
export class PopupComponent {
  @Input() public header: string;
  @Input() public isLoading: boolean;
  @Output() onDismiss: EventEmitter<void>;

  @ContentChild('footer') footerTemplate: TemplateRef<any>;
  constructor() {
    this.onDismiss = new EventEmitter();
  }

  public close(): void {
    this.onDismiss.emit();
  }
}
