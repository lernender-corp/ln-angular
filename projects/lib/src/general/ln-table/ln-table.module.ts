import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CdkBaseModule } from '../../cdk';
import { LnIconModule } from '../../common';

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
