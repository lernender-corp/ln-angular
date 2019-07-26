import { CdkCurrencyPipe } from './cdk-currency-format.pipe';
import { CurrencyPipe } from '@angular/common';

describe('Directive: DateFormat', () => {
  let currencyPipe: CdkCurrencyPipe;

  beforeEach(() => {
    currencyPipe = new CdkCurrencyPipe(new CurrencyPipe('en'));
  });

  it('create an instance', () => {
    expect(currencyPipe).toBeTruthy();
  });

  it('should format the currency correctly', () => {
    const currency = '1000000.50';
    const formattedCurrency = currencyPipe.transform(currency);
    expect(formattedCurrency).toEqual('1,000,000.50');
  });
});
