import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LnIconModule, LnButtonModule } from '../../common';
//
// CDK
//
import { CdkBaseModule } from '../../cdk';
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
