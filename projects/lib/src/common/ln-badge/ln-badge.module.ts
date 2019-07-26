import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LnBadge } from './ln-badge';

@NgModule({
  imports: [CommonModule],
  declarations: [LnBadge],
  exports: [LnBadge]
})
export class LnBadgeModule {}
