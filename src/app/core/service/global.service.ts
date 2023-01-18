import { Injectable } from '@angular/core';
import { ModalService } from 'src/app/shared/components/advanced/modal';
import { ToastService } from 'src/app/shared/components/advanced/toast/toast.service';
import { Config, Constant, Session } from '../domain';
import { Service } from '../utils/service';
@Injectable({
  providedIn: 'root',
})
export class GlobalService {
  public config: Config;
  public constant: Constant;
  public session: Session;
  public modalService: ModalService;
  public toastService: ToastService;
  constructor() {
    this.constant = new Constant();
    this.session = new Session();
    this.modalService = Service.injector.get(ModalService);
    this.toastService = Service.injector.get(ToastService);
  }
}
