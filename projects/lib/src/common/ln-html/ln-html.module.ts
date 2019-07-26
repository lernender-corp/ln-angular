import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkPipeModule } from '../../cdk';
import { LnHtml } from './ln-html';

@NgModule({
  imports: [CommonModule, CdkPipeModule],
  declarations: [LnHtml],
  exports: [LnHtml]
})
export class LnHtmlModule {}
