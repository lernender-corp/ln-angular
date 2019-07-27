import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
/**
 * Common Model(s)
 */
import { LnActionClickDirective } from './ln-action-click.directive';

/**
 * TM Directive(s)
 */
const LN_DIRECTIVE = [LnActionClickDirective];

@NgModule({
  imports: [CommonModule],
  declarations: LN_DIRECTIVE,
  exports: LN_DIRECTIVE
})

/**
 *   Module:  LnActionClickModule
 *   Description:  The module 'LnActionClickModule' is designed to ...
 *   Author: Lovelidge, Shawn
 */
export class LnActionClickModule {}
