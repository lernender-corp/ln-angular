import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LnCarouselItemModule } from '../ln-carousel-item';
import { LnCarousel } from './ln-carousel';
import { LnIconModule } from '../../common';

@NgModule({
  imports: [CommonModule, LnCarouselItemModule, LnIconModule],
  declarations: [LnCarousel],
  exports: [LnCarousel]
})
export class LnCarouselModule {}
