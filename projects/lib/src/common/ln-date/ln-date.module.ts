import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LnDate } from './ln-date';

@NgModule({
  imports: [CommonModule],
  declarations: [LnDate],
  exports: [LnDate]
})
export class LnDateModule {}
