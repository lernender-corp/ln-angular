import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LnToggle } from './ln-toggle';

@NgModule({
  imports: [CommonModule],
  declarations: [LnToggle],
  exports: [LnToggle]
})
export class LnToggleModule {}
