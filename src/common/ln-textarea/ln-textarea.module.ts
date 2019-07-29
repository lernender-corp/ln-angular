import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LnTextArea } from './ln-textarea';


@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [LnTextArea],
  exports: [LnTextArea]
})
export class LnTextAreaModule {}
