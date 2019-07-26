import { Pipe, PipeTransform } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

@Pipe({
  name: 'cdkCurrencyFormat'
})
export class CdkCurrencyPipe implements PipeTransform {

    constructor(private currencyPipe: CurrencyPipe) {
    }

    transform(value: any, currencyCode?: string, symbolDisplay?: boolean, digits?: string): string {

        let transformed = this.currencyPipe.transform(value, currencyCode, symbolDisplay, digits);
        if (transformed) {
          transformed = transformed.replace('$', '');
        }
        return transformed;
    }
}
