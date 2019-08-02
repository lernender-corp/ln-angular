import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CdkBaseModule } from '@lernender/cdk/cdk-base';
import { LnIconModule } from '@lernender/common/ln-icon';

//
// Component
//
import { LnTable } from './ln-table';

@NgModule({
  imports: [CommonModule, FormsModule, CdkBaseModule, LnIconModule],
  declarations: [LnTable],
  exports: [LnTable]
})
export class LnTableModule {}
