import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LnTab } from './ln-tab';

@NgModule({
  imports: [CommonModule],
  declarations: [LnTab],
  exports: [LnTab]
})
export class LnTabModule {}
