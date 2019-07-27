import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LnContainerModule } from '../../common';

import { CdkBaseModule } from '../../cdk';

import { LnViewer } from './ln-viewer';

@NgModule({
  imports: [CommonModule, LnContainerModule, CdkBaseModule],
  declarations: [LnViewer],
  exports: [LnViewer]
})
export class LnViewerModule {}
