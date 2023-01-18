import { Component, ContentChild, Input, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {
  @Input() isLoading: boolean;
  @Input() public header: string;
  @Input() public customClassBody: string;
  @ContentChild('headerRight') headerRightTmpl: TemplateRef<any>;
}
