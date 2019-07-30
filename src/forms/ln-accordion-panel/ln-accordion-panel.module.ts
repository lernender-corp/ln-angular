import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LnAccordionModule } from '@lernender/forms/ln-accordion';

import { LnAccordionPanel } from './ln-accordion-panel';

@NgModule({
  imports: [CommonModule, LnAccordionModule],
  declarations: [LnAccordionPanel],
  exports: [LnAccordionPanel]
})
export class LnAccordionPanelModule {}
