import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//
// Toyota modules
//
import { LnIconModule } from '../ln-icon';
import { LnChip } from './ln-chip';
import { LnHtmlModule } from '../ln-html/ln-html.module';

@NgModule({
  imports: [CommonModule, LnIconModule, LnHtmlModule],
  declarations: [LnChip],
  exports: [LnChip]
})
export class LnChipModule {}
