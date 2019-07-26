import { NgModule } from '@angular/core';
import { CdkDefaultTooltipModule } from './cdk-default-tooltip/cdk-component.module';


@NgModule({
  imports: [CdkDefaultTooltipModule],
  exports: [CdkDefaultTooltipModule]
})
export class CdkComponentModule {}