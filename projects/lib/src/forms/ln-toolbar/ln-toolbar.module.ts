import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LnToolbarItemModule } from './ln-toolbar-item/ln-toolbar-item.module';
import { LnToolbar } from './ln-toolbar';

@NgModule({
  imports: [CommonModule, LnToolbarItemModule],
  declarations: [LnToolbar],
  exports: [LnToolbar]
})
export class LnToolbarModule {}
