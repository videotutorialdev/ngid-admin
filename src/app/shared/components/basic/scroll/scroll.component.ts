import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { fromEvent } from 'rxjs';
import { BaseComponent } from 'src/app/core/base/base-component';
@Component({
  selector: 'app-scroll',
  templateUrl: './scroll.component.html',
})
export class ScrollComponent extends BaseComponent implements AfterViewInit {
  // parent element with max scroll
  @Input() selector: string;
  // disabled scroll
  @Input() trigger: boolean;
  // emit event when scroll down
  @Output() onScrollDown: EventEmitter<HTMLElement>;
  // emit event when scroll up
  @Output() onScrollUp: EventEmitter<HTMLElement>;
  // emit event when scroll on start of page or element
  @Output() onScrollStart: EventEmitter<HTMLElement>;
  // emit event when scroll in the end of page or element
  @Output() onScrollEnd: EventEmitter<HTMLElement>;
  // emit event when scrolling
  @Output() onScroll: EventEmitter<HTMLElement>;

  private currentScrollTop: number;

  constructor() {
    super('app.scroll');
    this.onScrollDown = new EventEmitter();
    this.onScrollUp = new EventEmitter();
    this.onScrollStart = new EventEmitter();
    this.onScrollEnd = new EventEmitter();
    this.onScroll = new EventEmitter();
    this.currentScrollTop = 0;
    this.trigger = true;
  }

  protected onInit(): void {
    this.setStateReady();
  }

  ngAfterViewInit(): void {
    this.scrollListenerState();
  }

  private scrollListenerState(): void {
    if (this.trigger !== false) {
      const selectorElement: HTMLElement | null = document.querySelector(
        this.selector
      );
      const element = selectorElement || document.documentElement;

      const subscription = fromEvent(
        selectorElement || document,
        'scroll'
      ).subscribe(() => {
        const { clientHeight, scrollHeight, scrollTop } =
          selectorElement || document.documentElement;

        this.onScroll.emit(element);

        if (scrollTop === 0) {
          this.onScrollStart.emit(element);
        } else if (scrollHeight <= Math.ceil(clientHeight + scrollTop)) {
          this.onScrollEnd.emit(element);
        } else if (this.currentScrollTop < scrollTop) {
          this.onScrollDown.emit(element);
        } else if (this.currentScrollTop > scrollTop) {
          this.onScrollUp.emit(element);
        }

        this.currentScrollTop = scrollTop;
      });

      this.subscription.add(subscription);
    }
  }
}
