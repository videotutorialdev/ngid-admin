export class TypeCurrencyModel {
  public name: 'currency';
  public currencyCode?: string | undefined;
  public display?: string | boolean | undefined;
  public digitsInfo?: string | undefined;
  public locale?: string | undefined;
}

export class TypeDateModel {
  public name: 'date';
  public format?: string | undefined;
  public timezone?: string | undefined;
  public locale?: string | undefined;
}

export type AllTableColumnTypeModel = TypeCurrencyModel | TypeDateModel;
