import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LnTabPanel } from './ln-tab-panel';
import { LnTab, LnTabModule } from '@lernender/forms/ln-tab';

@NgModule({
  imports: [CommonModule, LnTabModule],
  declarations: [LnTabPanel],
  exports: [LnTab, LnTabPanel]
})
export class LnTabPanelModule {}
