import { IObject } from 'src/app/core/interface';

export class ObjectHelper {
  public static resolveValue(record: IObject, field: string): any {
    if (!record || !field) return record;
    let value = { ...(record || {}) };
    const fieldSplit = field.split('.');
    while (fieldSplit.length > 0) {
      const firstSplit = fieldSplit.shift() as string;
      value = value[firstSplit];
      if (!value) {
        fieldSplit.splice(0);
      }
    }
    return value;
  }
}
