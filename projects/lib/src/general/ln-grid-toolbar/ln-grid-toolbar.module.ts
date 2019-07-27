import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LnIconModule } from '../../common';
import { LnCheckBoxModule } from '../../forms';

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
