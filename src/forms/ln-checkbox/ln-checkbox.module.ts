import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LnIconModule } from '@lernender/common/ln-icon';

import { LnCheckBox } from './ln-checkbox';

@NgModule({
  imports: [CommonModule, LnIconModule],
  declarations: [LnCheckBox],
  exports: [LnCheckBox]
})
export class LnCheckBoxModule {}
