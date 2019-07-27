import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LnButtonModule } from '../../common';

import { LnBanner } from './ln-banner';

@NgModule({
  imports: [CommonModule, LnButtonModule],
  declarations: [LnBanner],
  exports: [LnBanner]
})
export class LnBannerModule {}
