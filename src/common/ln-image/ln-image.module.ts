import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
/**
 * Components
 */
import { LnImage } from './ln-image';

@NgModule({
  imports: [CommonModule],
  declarations: [LnImage],
  exports: [LnImage]
})
export class LnImageModule {}
