import { Pipe, PipeTransform } from '@angular/core';
import { differenceBy } from 'lodash-es';

@Pipe({
  name: 'cdkFilterPipe',
  pure: false
})
export class CdkFilterPipe implements PipeTransform {
  public transform(a: any[], b: any[], prop: string = 'id'): any {
    if (!a || !b) {
      return a;
    }
    return differenceBy(a, b, prop);
  }
}
