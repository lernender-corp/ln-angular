import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LnButtonModule } from '@lernender/common/ln-button';

import { LnBanner } from './ln-banner';

@NgModule({
  imports: [CommonModule, LnButtonModule],
  declarations: [LnBanner],
  exports: [LnBanner]
})
export class LnBannerModule {}
