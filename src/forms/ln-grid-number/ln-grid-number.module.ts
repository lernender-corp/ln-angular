import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LnNumberModule } from '@lernender/common/ln-number';
import { LnGridNumber } from './ln-grid-number';

@NgModule({
  imports: [CommonModule, LnNumberModule],
  declarations: [LnGridNumber],
  exports: [LnGridNumber]
})
export class LnGridNumberModule {}
