import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//
// Dynamic Cards
//

//
//
//
import { LnDynamicCard } from './ln-dynamic-card';
//
// Directives
//
import { CdkDirectiveModule } from '../../cdk';

@NgModule({
  imports: [CommonModule, CdkDirectiveModule],
  declarations: [LnDynamicCard],
  exports: [LnDynamicCard]
})
export class LnDynamicCardModule {}
