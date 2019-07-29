import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';

import { CdkSafeHtmlPipe } from './common/cdk-safe-html/cdk-safe-html.pipe';
import { CdkFilterPipe } from './common/cdk-filter/cdk-filter.pipe';


const CDK_PIPES = [CdkSafeHtmlPipe, CdkFilterPipe];

@NgModule({
  imports: [CommonModule],
  providers: [CurrencyPipe],
  declarations: CDK_PIPES,
  exports: CDK_PIPES
})
export class CdkPipeModule {}
