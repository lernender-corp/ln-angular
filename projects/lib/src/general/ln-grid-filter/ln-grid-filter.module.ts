import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LnDateModule, LnInputModule, LnTextModule } from '../../common';
import { LnCheckBoxModule, LnDropDownModule } from '../../forms';
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
