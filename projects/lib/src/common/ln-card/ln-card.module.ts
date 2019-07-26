import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LnCard } from './ln-card';

@NgModule({
  imports: [CommonModule],
  declarations: [LnCard],
  exports: [LnCard]
})
export class LnCardModule {}
