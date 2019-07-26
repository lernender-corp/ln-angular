import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkBaseModule } from '../../cdk';

import { LnProperties } from './ln-properties';

@NgModule({
  imports: [CommonModule, CdkBaseModule],
  declarations: [LnProperties],
  exports: [LnProperties]
})
export class LnPropertiesModule {}
