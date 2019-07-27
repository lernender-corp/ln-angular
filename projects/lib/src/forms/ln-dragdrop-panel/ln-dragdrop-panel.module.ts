import { NgModule } from '@angular/core';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';

import { LnDragDropPanel } from './ln-dragdrop-panel';
import { LnIconModule, LnContainerModule } from '../../common';

@NgModule({
  imports: [CommonModule, LnIconModule, LnContainerModule, DragDropModule],
  declarations: [LnDragDropPanel],
  exports: [LnDragDropPanel]
})
export class LnDragDropPanelModule {}
