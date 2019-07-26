import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkBaseModule, CdkTooltipModule } from '../../cdk';
import { LnIconModule } from '../ln-icon';

import { LnColor } from './ln-color';

@NgModule({
  imports: [CommonModule, CdkBaseModule, LnIconModule, CdkTooltipModule],
  declarations: [LnColor],
  exports: [LnColor]
})
export class LnColorModule {}
