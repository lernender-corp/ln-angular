import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LnContainer } from './ln-container';

@NgModule({
  imports: [CommonModule],
  declarations: [LnContainer],
  exports: [LnContainer]
})
export class LnContainerModule {}
