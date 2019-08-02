import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LnHtmlModule } from '@lernender/common/ln-html';

import { LnGridImage } from './ln-grid-image';

@NgModule({
  imports: [CommonModule, LnHtmlModule],
  declarations: [LnGridImage],
  exports: [LnGridImage]
})

export class LnGridImageModule {}
