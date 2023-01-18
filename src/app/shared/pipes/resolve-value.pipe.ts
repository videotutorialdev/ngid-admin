import { Pipe, PipeTransform } from '@angular/core';
import { IObject } from 'src/app/core/interface';
import { ObjectHelper } from '../helpers/object.helper';

@Pipe({
  name: 'resolveValue',
})
export class ResolveValuePipe implements PipeTransform {
  transform(record: IObject, field: string): any {
    return ObjectHelper.resolveValue(record, field);
  }
}
