import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Common Model(s)
 */
import { LnClipboardDirective } from './ln-clipboard.directive';

/**
 * TM Directive(s)
 */
const LN_DIRECTIVE = [
  LnClipboardDirective
];

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: LN_DIRECTIVE,
  exports: LN_DIRECTIVE
})

/**
 *   Module:  LnDirectiveModule
 *   Description:  The module 'LnDirectiveModule' is designed to ...
 *   Author: Lovelidge, Shawn
 */
export class LnClipboardModule {
}
