import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LnSectionModule } from '@lernender/forms/ln-section';
//
// CDK
//
import { CdkDirectiveModule } from '@lernender/cdk/cdk-directive';

//
// Child Components
//
import { LnButtonModule } from '@lernender/common/ln-button';
import { LnSectionPanel } from './ln-section-panel';

@NgModule({
  imports: [CommonModule, LnButtonModule, CdkDirectiveModule, LnSectionModule],
  declarations: [LnSectionPanel],
  exports: [LnSectionPanel]
})
export class LnSectionPanelModule {}
