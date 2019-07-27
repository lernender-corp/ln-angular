import { CommonModule } from '@angular/common';
import { CdkTooltipModule } from '../../cdk/cdk-directive/common/cdk-tooltip.module';
import { NgModule } from '@angular/core';
import { LnNumberModule } from '../../common/ln-number/ln-number.module';
import { LnGridNumber } from './ln-grid-number';

@NgModule({
  imports: [CommonModule, LnNumberModule, CdkTooltipModule],
  declarations: [LnGridNumber],
  exports: [LnGridNumber]
})
export class LnGridNumberModule {}
