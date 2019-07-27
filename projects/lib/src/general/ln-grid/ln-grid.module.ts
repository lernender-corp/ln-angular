import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ScrollingModule } from '@angular/cdk/scrolling';

import { CdkBaseModule, CdkDirectiveModule} from '../../cdk';
import { LnIconModule, LnInputModule } from '../../common';
import { LnCheckBoxModule } from '../../forms';

import { LnGridCellModule } from '../../general/ln-grid-cell';
import { LnGridFilterModule } from '../../general/ln-grid-filter';
import { LnGridToolBarModule } from '../../general/ln-grid-toolbar';
import { LnGridCheckBoxModule } from '../../general/ln-grid-checkbox';
import { LnGridColorModule } from '../../general/ln-grid-color';
import { LnGridIconModule } from '../../general/ln-grid-icon';
import { LnGridImageModule } from '../../general/ln-grid-image';
import { LnGridInputModule } from '../../general/ln-grid-input';
import { LnGridTextModule } from '../../general/ln-grid-text';
import { LnGridNumberModule } from '../ln-grid-number';

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
