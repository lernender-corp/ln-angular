import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LnDateModule } from '@lernender/common/ln-date';
import { LnInputModule } from '@lernender/common/ln-input';
import { LnTextModule } from '@lernender/common/ln-text';
import { LnDropDownModule } from '@lernender/forms/ln-dropdown';
import { LnCheckBoxModule } from '@lernender/forms/ln-checkbox';

import { LnGridFilter } from './ln-grid-filter';

@NgModule({
  imports: [
    CommonModule,
    LnCheckBoxModule,
    LnDateModule,
    LnDropDownModule,
    LnInputModule,
    LnTextModule
  ],
  declarations: [LnGridFilter],
  exports: [LnGridFilter]
})
export class LnGridFilterModule {}
