import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LnIconModule, LnHtmlModule } from '../../common';

import { LnAccordion } from './ln-accordion';

@NgModule({
  imports: [CommonModule, LnIconModule, LnHtmlModule],
  declarations: [LnAccordion],
  exports: [LnAccordion]
})
export class LnAccordionModule {}
