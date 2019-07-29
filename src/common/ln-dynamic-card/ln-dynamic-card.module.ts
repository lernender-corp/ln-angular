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
import { CdkDirectiveModule } from '@lernender/cdk/cdk-directive';

@NgModule({
  imports: [CommonModule, CdkDirectiveModule],
  declarations: [LnDynamicCard],
  exports: [LnDynamicCard]
})
export class LnDynamicCardModule {}
