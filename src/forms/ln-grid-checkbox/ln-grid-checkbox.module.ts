import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LnCheckBoxModule} from '@lernender/forms/ln-checkbox';

import { LnGridCheckBox } from './ln-grid-checkbox';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    LnCheckBoxModule
  ],
  declarations: [
    LnGridCheckBox
  ],
  exports: [
    LnGridCheckBox
  ]
})

export class LnGridCheckBoxModule {
}
