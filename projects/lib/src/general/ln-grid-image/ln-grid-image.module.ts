import { CdkTooltipModule } from './../../cdk/cdk-directive/common/cdk-tooltip.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LnHtmlModule } from '../../common';

import { LnGridImage } from './ln-grid-image';

@NgModule({
  imports: [CommonModule, LnHtmlModule, CdkTooltipModule],
  declarations: [LnGridImage],
  exports: [LnGridImage]
})
export class LnGridImageModule {}
