import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LnTabPanel } from './ln-tab-panel';
import { LnTab } from './ln-tab/ln-tab';
import { LnTabModule } from './ln-tab/ln-tab.module';

@NgModule({
  imports: [CommonModule, LnTabModule],
  declarations: [LnTabPanel],
  exports: [LnTab, LnTabPanel]
})
export class LnTabPanelModule {}
