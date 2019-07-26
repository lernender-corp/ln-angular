import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';

import { CdkSafeHtmlPipe } from './common/cdk-safe-html/cdk-safe-html.pipe';
import { CdkFilterPipe } from './common/cdk-filter/cdk-filter.pipe';
import { CdkDatePipe } from './common/cdk-date/cdk-date-format.pipe';
import { CdkCurrencyPipe } from './common/cdk-currency/cdk-currency-format.pipe';

const CDK_PIPES = [CdkSafeHtmlPipe, CdkFilterPipe, CdkDatePipe, CdkCurrencyPipe];

@NgModule({
  imports: [CommonModule],
  providers: [CurrencyPipe],
  declarations: CDK_PIPES,
  exports: CDK_PIPES
})
export class CdkPipeModule {}
