import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { ControlContainer } from '@angular/forms';
import {
  BaseValueAccessor,
  makeProvider,
} from 'src/app/core/base/base-value-accessor';
import { ObjectHelper } from 'src/app/shared/helpers/object.helper';

@Component({
  selector: 'app-auto-complete',
  templateUrl: './auto-complete.component.html',
  styleUrls: ['./auto-complete.component.scss'],
  providers: [makeProvider(AutoCompleteComponent)],
})
export class AutoCompleteComponent extends BaseValueAccessor {
  @Input() public stringUrl: string;

  public keywords: string;
  public perPage: number;
  public page: number;
  public hasReloadAll: boolean;

  private REQUEST_TIMEOUT_IN_MS = 500;
  private timeOut: NodeJS.Timeout;

  constructor(
    controlContainer: ControlContainer,
    private _changeDetectorRef: ChangeDetectorRef
  ) {
    super('app.auto-complete', controlContainer);
  }

  protected onInitBaseValueAccessor(): void {
    this.setStateInitialization();
    this.fetchList();
    this.setStateReady();
  }

  private setStateInitialization(): void {
    this.perPage = 10;
    this.page = 1;
    this.options = [];
  }

  public fetchList(): void {
    const subs = this.httpClientService
      .get<Array<any>>(`${this.stringUrl}${this.queryParams}`)
      .subscribe({
        next: (options: Array<any>) => {
          this.options.push(...options);
          this.hasReloadAll = options.length < this.perPage;
        },
        error: (error) => {
          this.logger.error(error);
        },
      });
    this.subscription.add(subs);
  }

  private get queryParams(): string {
    let params = `?_page=${this.page}&_limit=${this.perPage}`;

    if (this.keywords) {
      params += `&q=${this.keywords}`;
    }

    return params;
  }

  public handleSelectOption(option: any): void {
    const value = this.optionValuePath
      ? ObjectHelper.resolveValue(option, this.optionValuePath)
      : option;
    this.formControl.patchValue(value);
  }

  public handleInput(event: Event): void {
    clearTimeout(this.timeOut);
    this.timeOut = setTimeout(() => {
      this.reset();
      const inputElement = event.target as HTMLInputElement;
      this.keywords = inputElement.value;
      this.fetchList();
    }, this.REQUEST_TIMEOUT_IN_MS);
  }

  public handleScrollEnd(): void {
    if (!this.hasReloadAll) {
      this.page = this.page + 1;
      this.fetchList();
    }
  }

  private reset(): void {
    this.page = 1;
    this.hasReloadAll = false;
    this.options = [];
  }
}
