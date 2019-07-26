import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CdkDefaultTooltip } from './cdk-default-tooltip';

@NgModule({
  imports: [CommonModule],
  declarations: [CdkDefaultTooltip],
  exports: [CdkDefaultTooltip],
  entryComponents: [CdkDefaultTooltip]
})
export class CdkDefaultTooltipModule {}
