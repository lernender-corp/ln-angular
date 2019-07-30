import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkBaseModule } from '@lernender/cdk/cdk-base';
import { CdkDirectiveModule } from '@lernender/cdk/cdk-directive';
import { LnIconModule } from '@lernender/common/ln-icon';

import { LnDropDown } from './ln-dropdown';

@NgModule({
  imports: [CommonModule, CdkBaseModule, LnIconModule, CdkDirectiveModule],
  declarations: [LnDropDown],
  exports: [LnDropDown]
})
export class LnDropDownModule {}
