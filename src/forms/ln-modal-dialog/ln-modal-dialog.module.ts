import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {LnModalDialog} from './ln-modal-dialog';
import {CdkBaseModule} from '@lernender/cdk/cdk-base';
import {CdkDirectiveModule} from '@lernender/cdk/cdk-directive';
import {LnButtonModule} from '@lernender/common/ln-button';
import {LnIconModule} from '@lernender/common/ln-icon';

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
