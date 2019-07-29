import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LnNumber } from './ln-number';

@NgModule({
  imports: [CommonModule],
  declarations: [LnNumber],
  exports: [LnNumber]
})
export class LnNumberModule {}
