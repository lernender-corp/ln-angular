import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LnTextModule } from '@lernender/common/ln-text';

import { LnGridText } from './ln-grid-text';

@NgModule({
  imports: [CommonModule, LnTextModule],
  declarations: [LnGridText],
  exports: [LnGridText]
})
export class LnGridTextModule {}
