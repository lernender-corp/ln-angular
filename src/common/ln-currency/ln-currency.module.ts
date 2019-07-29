import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LnCurrency } from './ln-currency';

@NgModule({
  imports: [CommonModule],
  declarations: [LnCurrency],
  exports: [LnCurrency]
})
export class LnCurrencyModule {}
