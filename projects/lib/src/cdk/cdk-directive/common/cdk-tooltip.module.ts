import { CdkTooltipDirective, CDK_TOOLTIP_SCROLL_STRATEGY_FACTORY_PROVIDER } from './cdk-tooltip.directive';
import { CdkComponentModule } from './../../cdk-component/cdk-component.module';
import { NgModule } from '@angular/core';
import { OverlayModule } from '@angular/cdk/overlay';

@NgModule({
  imports: [
    OverlayModule,
    CdkComponentModule
  ],
  declarations: [
    CdkTooltipDirective
  ],
  exports: [
    CdkTooltipDirective,
    CdkComponentModule
  ],
  providers: [
    CDK_TOOLTIP_SCROLL_STRATEGY_FACTORY_PROVIDER
  ]
})
export class CdkTooltipModule {}
