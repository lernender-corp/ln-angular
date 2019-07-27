import { CdkTooltipModule } from './../../cdk/cdk-directive/common/cdk-tooltip.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { LnGridColor } from './ln-grid-color';

@NgModule({
  imports: [CommonModule, CdkTooltipModule],
  declarations: [LnGridColor],
  exports: [LnGridColor]
})
export class LnGridColorModule {}
