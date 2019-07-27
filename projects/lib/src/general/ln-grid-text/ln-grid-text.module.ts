import { CommonModule } from '@angular/common';
import { CdkTooltipModule } from '../../cdk/cdk-directive/common/cdk-tooltip.module';
import { NgModule } from '@angular/core';
import { LnTextModule } from '../../common';

import { LnGridText } from './ln-grid-text';

@NgModule({
  imports: [CommonModule, LnTextModule, CdkTooltipModule],
  declarations: [LnGridText],
  exports: [LnGridText]
})
export class LnGridTextModule {}
