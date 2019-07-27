import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkBaseModule } from '../../cdk';
import { LnIconModule } from '../../common';

import { LnColorSwatch } from './ln-color-swatch';

@NgModule({
  imports: [CommonModule, CdkBaseModule, LnIconModule],
  declarations: [LnColorSwatch],
  exports: [LnColorSwatch]
})
export class LnColorSwatchModule {}
