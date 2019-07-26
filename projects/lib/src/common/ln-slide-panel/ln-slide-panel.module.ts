import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LnSlidePanel } from './ln-slide-panel';

@NgModule({
  imports: [CommonModule],
  declarations: [LnSlidePanel],
  exports: [LnSlidePanel]
})
export class LnSlidePanelModule {}
