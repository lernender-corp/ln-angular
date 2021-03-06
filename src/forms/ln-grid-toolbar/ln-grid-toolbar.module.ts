import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LnIconModule } from '@lernender/common/ln-icon';
import { LnCheckBoxModule } from '@lernender/forms/ln-checkbox';

/**
 * Component(s)
 */
import { LnGridToolBar } from './ln-grid-toolbar';

@NgModule({
  imports: [CommonModule, FormsModule, LnIconModule, LnCheckBoxModule],
  declarations: [LnGridToolBar],
  exports: [LnGridToolBar]
})
export class LnGridToolBarModule {}
