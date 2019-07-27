import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {LnModalDialog} from './ln-modal-dialog';
import {CdkBaseModule, CdkDirectiveModule} from '../../cdk';
import {LnButtonModule, LnIconModule} from '../../common';

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
    LnModalDialog
  ],
  exports: [
    LnModalDialog
  ]
})

export class LnModalDialogModule {
}
