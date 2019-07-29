import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { LnInput } from './ln-input';
import { LnIconModule } from '@lernender/common/ln-icon';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    LnIconModule
  ],
  declarations: [LnInput],
  exports: [LnInput]
})
export class LnInputModule {}
