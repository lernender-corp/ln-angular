import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkBaseModule, CdkDirectiveModule } from '../../cdk';
import { LnIconModule } from '../../common';

import { LnDropDown } from './ln-dropdown';

@NgModule({
  imports: [CommonModule, CdkBaseModule, LnIconModule, CdkDirectiveModule],
  declarations: [LnDropDown],
  exports: [LnDropDown]
})
export class LnDropDownModule {}
