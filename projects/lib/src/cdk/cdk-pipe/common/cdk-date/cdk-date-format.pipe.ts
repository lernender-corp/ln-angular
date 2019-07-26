import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'cdkDateFormat'
})
export class CdkDatePipe implements PipeTransform {

  transform(value: Date | string | number, ...args: any[]): string {
    return '';
  }
}
