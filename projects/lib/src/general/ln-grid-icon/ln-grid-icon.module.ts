import { CdkTooltipModule } from './../../cdk/cdk-directive/common/cdk-tooltip.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LnIconModule } from '../../common';

import { LnGridIcon } from './ln-grid-icon';

@NgModule({
  imports: [CommonModule, LnIconModule, CdkTooltipModule],
  declarations: [LnGridIcon],
  exports: [LnGridIcon]
})
export class LnGridIconModule {}
