import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LnButton } from './ln-button';

@NgModule({
  imports: [CommonModule],
  declarations: [LnButton],
  exports: [LnButton]
})
export class LnButtonModule {}
