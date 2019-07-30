import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LnContainerModule } from '@lernender/common/ln-container';
import { CdkBaseModule } from '@lernender/cdk/cdk-base';

import { LnViewer } from './ln-viewer';

@NgModule({
  imports: [CommonModule, LnContainerModule, CdkBaseModule],
  declarations: [LnViewer],
  exports: [LnViewer]
})
export class LnViewerModule {}
