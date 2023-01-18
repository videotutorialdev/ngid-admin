export class LanguageModel {
  private static instances: Array<LanguageModel>;
  private constructor(public code: string, public name: string) {}
  public static createList(): Array<LanguageModel> {
    if (this.instances) return this.instances;
    const langs = [
      ['en', 'English'],
      ['id', 'Indonesia'],
    ];
    this.instances = langs.map(([code, name]) => new LanguageModel(code, name));
    return this.instances;
  }
}
