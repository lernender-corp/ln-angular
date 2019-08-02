import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LnIconModule } from '@lernender/common/ln-icon';

import { LnGridIcon } from './ln-grid-icon';

@NgModule({
  imports: [CommonModule, LnIconModule],
  declarations: [LnGridIcon],
  exports: [LnGridIcon]
})
export class LnGridIconModule {}
