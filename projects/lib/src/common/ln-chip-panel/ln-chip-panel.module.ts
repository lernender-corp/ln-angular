import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollingModule } from '@angular/cdk/scrolling';
//
// Toyota modules
//
import { LnIconModule } from '../ln-icon';
import { LnChipModule } from '../ln-chip';
import { LnChipPanel } from './ln-chip-panel';
import { ChipList } from './chip-list/chip-list';
import { CdkTooltipModule } from './../../cdk/cdk-directive/common/cdk-tooltip.module';

@NgModule({
  imports: [
    CommonModule,
    LnChipModule,
    ScrollingModule,
    LnIconModule,
    CdkTooltipModule
  ],
  declarations: [LnChipPanel, ChipList],
  exports: [LnChipPanel]
})
export class LnChipPanelModule {}
