import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LnCarouselItem } from './ln-carousel-item';

@NgModule({
  imports: [CommonModule],
  declarations: [LnCarouselItem],
  exports: [LnCarouselItem]
})
export class LnCarouselItemModule {}
