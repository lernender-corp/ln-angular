import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkBaseModule } from '../../cdk';
import { LnIconModule } from '../../common';

import { LnList } from './ln-list';

@NgModule({
  imports: [CommonModule, CdkBaseModule, LnIconModule],
  declarations: [LnList],
  exports: [LnList]
})
export class LnListModule {}
