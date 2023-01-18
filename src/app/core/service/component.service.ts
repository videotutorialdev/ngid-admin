import {
  ApplicationRef,
  ComponentFactory,
  ComponentFactoryResolver,
  ComponentRef,
  Injectable,
  Injector,
  Type,
  ViewContainerRef,
} from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class ComponentService {
  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private applicationRef: ApplicationRef,
    private injector: Injector
  ) {}
  public create(
    component: Type<any>,
    element: HTMLElement | Element | ViewContainerRef,
    componentInstance?: object,
    projectTableNodes?: any
  ): any {
    let componentRef: ComponentRef<any>;
    const componentFactory: ComponentFactory<any> =
      this.componentFactoryResolver.resolveComponentFactory(component);
    if (element instanceof ViewContainerRef) {
      componentRef = element.createComponent(
        componentFactory,
        0,
        this.injector,
        projectTableNodes
      );
    } else {
      componentRef = componentFactory.create(
        this.injector,
        [[projectTableNodes]],
        element
      );
    }
    Object.assign(componentRef.instance, componentInstance);
    componentRef.changeDetectorRef.detectChanges();
    this.applicationRef.attachView(componentRef.hostView);
    return componentRef;
  }
}
