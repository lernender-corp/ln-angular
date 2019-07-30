import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LnIconModule } from '@lernender/common/ln-icon';

import { LnLabel } from './ln-label';

@NgModule({
  imports: [CommonModule, LnIconModule],
  declarations: [LnLabel],
  exports: [LnLabel]
})
export class LnLabelModule {}
