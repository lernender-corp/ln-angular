import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {LnAlertDialog} from './ln-alert-dialog';
import {CdkBaseModule, CdkDirectiveModule} from '../../cdk';
import {LnButtonModule} from '../ln-button';
import {LnIconModule} from '../ln-icon';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    CdkBaseModule,
    CdkDirectiveModule,
    LnButtonModule,
    LnIconModule
  ],
  declarations: [
    LnAlertDialog
  ],
  exports: [
    LnAlertDialog
  ]
})

export class LnAlertDialogModule {
}
