class Loader {
  public static instance: Loader;
  constructor(private loaderElement: HTMLElement) {}

  public show(): void {
    if (this.loaderElement) {
      this.loaderElement.classList.remove('hide');
    }
  }

  public hide(): void {
    if (this.loaderElement) {
      this.loaderElement.classList.add('hide');
    }
  }

  public static create(): Loader {
    if (!this.instance) {
      const appLoadingWrapperElement = document
        .getElementsByClassName('app-loading-wrapper')
        .item(0);
      this.instance = new Loader(appLoadingWrapperElement as HTMLElement);
    }
    return this.instance;
  }
}

export const loader = Loader.create();
