import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LnText } from './ln-text';

@NgModule({
  imports: [CommonModule],
  declarations: [LnText],
  exports: [LnText]
})
export class LnTextModule {}
