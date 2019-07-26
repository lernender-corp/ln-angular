import { CdkTooltipModule } from './common/cdk-tooltip.module';

import { ModuleWithProviders, NgModule } from '@angular/core';

import { CdkAnchorDirective } from './common/cdk-anchor.directive';
import { CdkScrollBarDirective } from './common/cdk-scroll-bar.directive';
import { CdkDocumentClickDirective } from './common/cdk-document-click.directive';
import { CdkReadyDirective } from './common/cdk-ready.directive';
import { CdkNgForOfDirective } from './common/cdk-ng-for-of/cdk-ng-for-of.directive';
import { CDK_TOOLTIP_SCROLL_STRATEGY_FACTORY_PROVIDER } from './common/cdk-tooltip.directive';

const CDK_DIRECTIVES = [
  CdkAnchorDirective,
  CdkScrollBarDirective,
  CdkDocumentClickDirective,
  CdkReadyDirective,
  CdkNgForOfDirective
];
const CDK_DIRECTIVE_SERVICES = [
  {
    provide: 'WINDOW',
    useFactory: winFactory
  },
  CDK_TOOLTIP_SCROLL_STRATEGY_FACTORY_PROVIDER
];

@NgModule({
  imports: [
    CdkTooltipModule
  ],
  declarations: CDK_DIRECTIVES,
  exports: [...CDK_DIRECTIVES, CdkTooltipModule],
  providers: CDK_DIRECTIVE_SERVICES
})

export class CdkDirectiveModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: CdkDirectiveModule,
      providers: CDK_DIRECTIVE_SERVICES
    };
  }
}

export function winFactory() {
  return window;
}
