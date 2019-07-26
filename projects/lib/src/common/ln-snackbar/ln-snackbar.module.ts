import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LnIconModule } from '../ln-icon';
import { LnSnackBar } from './ln-snackbar';

@NgModule({
  imports: [
    CommonModule,
    LnIconModule
  ],
  declarations: [LnSnackBar],
  exports: [LnSnackBar]
})
export class LnSnackBarModule {}
