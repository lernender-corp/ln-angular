import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LnCarouselItemModule } from '@lernender/forms/ln-carousel-item';
import { LnIconModule } from '@lernender/common/ln-icon';
import { LnCarousel } from './ln-carousel';

@NgModule({
  imports: [CommonModule, LnCarouselItemModule, LnIconModule],
  declarations: [LnCarousel],
  exports: [LnCarousel]
})
export class LnCarouselModule {}
