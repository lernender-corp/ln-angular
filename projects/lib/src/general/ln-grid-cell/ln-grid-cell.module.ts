import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkServiceModule } from '../../cdk';

import {
  LnDateModule,
  LnHtmlModule,
  LnCurrencyModule,
  LnHyperLinkModule,
  LnIconModule,
  LnImageModule,
  LnInputModule,
  LnJsonModule,
  LnNumberModule,
  LnPercentModule,
  LnTextModule,
  LnTextAreaModule
} from '../../common';
import { LnCheckBoxModule, LnDropDownModule } from '../../forms';

// import { LnToolTipModule } from '@lernender/directive';

import { LnGridCell } from './ln-grid-cell';

@NgModule({
  imports: [
    CommonModule,
    LnCheckBoxModule,
    LnCurrencyModule,
    LnDateModule,
    LnInputModule,
    LnDropDownModule,
    LnHtmlModule,
    LnHyperLinkModule,
    LnIconModule,
    LnImageModule,
    LnJsonModule,
    LnNumberModule,
    LnPercentModule,
    LnTextModule,
    LnTextAreaModule
  ],
  providers: [],
  declarations: [LnGridCell],
  exports: [LnGridCell]
})
export class LnGridCellModule {}
