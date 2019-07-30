import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LnIconModule } from '@lernender/common/ln-icon';
import { LnButtonModule } from '@lernender/common/ln-button';
//
// CDK
//
import { CdkBaseModule } from '@lernender/cdk/cdk-base';
//
// Common Components
//

//
// Child Components
//
import { LnSection } from './ln-section';

@NgModule({
  imports: [CommonModule, CdkBaseModule, LnIconModule, LnButtonModule],
  declarations: [LnSection],
  exports: [LnSection]
})
export class LnSectionModule {}
