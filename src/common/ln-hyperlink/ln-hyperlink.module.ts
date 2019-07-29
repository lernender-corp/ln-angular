import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
/**
 * Components
 */
import { LnHyperLink } from './ln-hyperlink';

@NgModule({
  imports: [CommonModule],
  declarations: [LnHyperLink],
  exports: [LnHyperLink]
})
export class LnHyperLinkModule {}
