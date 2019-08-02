import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { LnCurrencyModule } from '@lernender/common/ln-currency';
import { LnDateModule } from '@lernender/common/ln-date';
import { LnHtmlModule } from '@lernender/common/ln-html';
import { LnHyperLinkModule } from '@lernender/common/ln-hyperlink';
import { LnIconModule } from '@lernender/common/ln-icon';
import { LnImageModule } from '@lernender/common/ln-image';
import { LnInputModule } from '@lernender/common/ln-input';
import { LnJsonModule } from '@lernender/common/ln-json';
import { LnNumberModule } from '@lernender/common/ln-number';
import { LnPercentModule } from '@lernender/common/ln-percent';
import { LnTextAreaModule } from '@lernender/common/ln-textarea';
import { LnTextModule } from '@lernender/common/ln-text';

import { LnCheckBoxModule } from '@lernender/forms/ln-checkbox';
import { LnDropDownModule } from '@lernender/forms/ln-dropdown';

import { LnGridCell } from './ln-grid-cell';

@NgModule({
  imports: [
    CommonModule,
    LnCheckBoxModule,
    LnCurrencyModule,
    LnDateModule,
    LnDropDownModule,
    LnHtmlModule,
    LnHyperLinkModule,
    LnIconModule,
    LnImageModule,
    LnInputModule,
    LnJsonModule,
    LnNumberModule,
    LnPercentModule,
    LnTextAreaModule,
    LnTextModule,
  ],
  providers: [],
  declarations: [LnGridCell],
  exports: [LnGridCell]
})
export class LnGridCellModule {}
