import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ScrollingModule } from '@angular/cdk/scrolling';

import { CdkBaseModule} from '@lernender/cdk/cdk-base';
import { CdkDirectiveModule} from '@lernender/cdk/cdk-directive';

import { LnIconModule } from '@lernender/common/ln-icon';
import { LnInputModule } from '@lernender/common/ln-input';

import { LnCheckBoxModule } from '@lernender/forms/ln-checkbox';
import { LnGridCellModule } from '@lernender/forms/ln-grid-cell';
import { LnGridCheckBoxModule } from '@lernender/forms/ln-grid-checkbox';
import { LnGridColorModule } from '@lernender/forms/ln-grid-color';
import { LnGridFilterModule } from '@lernender/forms/ln-grid-filter';
import { LnGridIconModule } from '@lernender/forms/ln-grid-icon';
import { LnGridImageModule } from '@lernender/forms/ln-grid-image';
import { LnGridInputModule } from '@lernender/forms/ln-grid-input';
import { LnGridNumberModule } from '@lernender/forms/ln-grid-number';
import { LnGridTextModule } from '@lernender/forms/ln-grid-text';
import { LnGridToolBarModule } from '@lernender/forms/ln-grid-toolbar';

//
// Component
//
import { LnGrid } from './ln-grid';

const virtualScrollConfig = {
throttle: 0,
debounce: 0,
animationInterval: 750,
resizeInterval: 1000
};

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ScrollingModule,
    CdkBaseModule,
    CdkDirectiveModule,
    LnIconModule,
    LnInputModule,
    LnCheckBoxModule,
    LnGridFilterModule,
    LnGridCheckBoxModule,
    LnGridTextModule,
    LnGridNumberModule,
    LnGridCellModule,
    LnGridColorModule,
    LnGridIconModule,
    LnGridImageModule,
    LnGridInputModule,
    LnGridToolBarModule
  ],
  declarations: [LnGrid],
  exports: [LnGrid],
  providers: [
    {
      provide: 'virtual-scroller-config', useValue: virtualScrollConfig
    }
  ]
})
export class LnGridModule {}
