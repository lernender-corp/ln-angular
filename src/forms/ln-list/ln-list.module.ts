import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkBaseModule } from '@lernender/cdk/cdk-base';
import { LnIconModule } from '@lernender/common/ln-icon';

import { LnList } from './ln-list';

@NgModule({
  imports: [CommonModule, CdkBaseModule, LnIconModule],
  declarations: [LnList],
  exports: [LnList]
})
export class LnListModule {}
