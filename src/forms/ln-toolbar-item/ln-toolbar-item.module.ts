import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LnToolbarItem } from './ln-toolbar-item';
import { LnIconModule } from '@lernender/common/ln-icon';

@NgModule({
  imports: [CommonModule, LnIconModule],
  declarations: [LnToolbarItem],
  exports: [LnToolbarItem]
})
export class LnToolbarItemModule {}
