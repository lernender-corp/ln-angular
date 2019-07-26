import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LnTextArea } from './ln-textarea';
import { CdkTooltipModule } from '../../cdk/cdk-directive/common/cdk-tooltip.module';

@NgModule({
  imports: [CommonModule, FormsModule, CdkTooltipModule],
  declarations: [LnTextArea],
  exports: [LnTextArea]
})
export class LnTextAreaModule {}
