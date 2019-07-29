import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { LnRadioButton } from './ln-radio-button';

@NgModule({
  imports: [FormsModule, CommonModule],
  declarations: [LnRadioButton],
  exports: [LnRadioButton]
})
export class LnRadioButtonModule {}
