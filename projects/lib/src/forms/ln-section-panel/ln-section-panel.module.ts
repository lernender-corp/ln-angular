import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LnSectionModule } from '../ln-section';

//
// CDK
//
import { CdkDirectiveModule } from '../../cdk';

//
// Child Components
//
import { LnButtonModule } from '../../common';
import { LnSectionPanel } from './ln-section-panel';

@NgModule({
  imports: [CommonModule, LnButtonModule, CdkDirectiveModule, LnSectionModule],
  declarations: [LnSectionPanel],
  exports: [LnSectionPanel]
})
export class LnSectionPanelModule {}
