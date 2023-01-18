import { Component, Inject } from '@angular/core';
import { Base } from './base';

@Component({
  template: '',
})
export abstract class BaseModule extends Base {
  protected abstract onInit(): void;
  constructor(@Inject(String) moduleCode: string) {
    super(moduleCode);
  }

  protected onBaseInit(): void {
    this.logger.debug(
      `[ Load Base Module ]: ${this.translateService.instant(
        this.moduleCode + '.header'
      )}`
    );
    this.onInit();
  }
}
