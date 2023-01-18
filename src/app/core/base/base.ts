import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { GlobalService } from '../service/global.service';
import { HttpClientService } from '../service/http-client.service';
import { Logger } from '../utils/logger';
import { Service } from '../utils/service';

@Component({
  template: '',
})
export abstract class Base implements OnInit, OnDestroy {
  public isLoading: boolean;
  public isProcessing: boolean;
  public formGroup: FormGroup;
  public globalService: GlobalService;

  protected formBuilder: FormBuilder;
  protected router: Router;
  protected httpClientService: HttpClientService;
  protected logger: Logger;
  protected subscription: Subscription;
  protected translateService: TranslateService;
  protected abstract onBaseInit(): void;
  constructor(@Inject(String) public moduleCode: string) {}

  ngOnInit(): void {
    this.setBaseStateInitialization();
    this.onBaseInit();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.httpClientService.unsubscribe();
  }

  private setBaseStateInitialization(): void {
    this.formGroup = new FormGroup({});
    this.logger = new Logger(this);
    this.formBuilder = new FormBuilder();
    this.subscription = new Subscription();
    this.router = Service.injector.get(Router);
    this.globalService = Service.injector.get(GlobalService);
    this.httpClientService = Service.injector.get(HttpClientService);
    this.translateService = Service.injector.get(TranslateService);
  }

  protected setStateLoading(): void {
    this.isLoading = true;
    this.formGroup.disable();
  }

  protected setStateProcessing(): void {
    this.formGroup.disable();
    this.isProcessing = true;
  }

  protected setStateReady(): void {
    this.isLoading = false;
    this.isProcessing = false;
    this.formGroup.enable();
  }

  protected validate(): void {
    this.formGroup.setStateSubmitted();
    if (!this.formGroup.valid) {
      this.formGroup.resetStateSubmitted();
    }
  }
}
