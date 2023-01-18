import { Component } from '@angular/core';
import { BaseComponent } from 'src/app/core/base/base-component';
import { LanguageModel } from 'src/app/core/models/language.model';

@Component({
  selector: 'app-lang-switcher',
  templateUrl: './lang-switcher.component.html',
})
export class LangSwitcherComponent extends BaseComponent {
  public languages: Array<LanguageModel>;
  constructor() {
    super('app.lang-switcher');
  }

  protected onInit(): void {
    this.setStateInitialization();
    this.buildFormGroup();
    this.setStateReady();
  }

  private setStateInitialization(): void {
    this.languages = LanguageModel.createList();
  }

  private buildFormGroup(): void {
    this.formGroup = this.formBuilder.group({
      lang: this.globalService.session.lang,
    });
  }

  public handleChangeLanguage(langCode: string): void {
    this.translateService.setDefaultLang(langCode);
    localStorage.setItem(
      this.globalService.constant.DEFAULT_LANG_KEY,
      langCode
    );
  }
}
