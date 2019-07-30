import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LnIconModule } from '@lernender/common/ln-icon';
import { LnHtmlModule } from '@lernender/common/ln-html';

import { LnAccordion } from './ln-accordion';

@NgModule({
  imports: [CommonModule, LnIconModule, LnHtmlModule],
  declarations: [LnAccordion],
  exports: [LnAccordion]
})
export class LnAccordionModule {}
