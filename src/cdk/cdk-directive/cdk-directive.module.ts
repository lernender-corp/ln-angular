import { ModuleWithProviders, NgModule } from '@angular/core';
import { CdkAnchorDirective } from './common/cdk-anchor.directive';
import { CdkScrollBarDirective } from './common/cdk-scroll-bar.directive';
import { CdkDocumentClickDirective } from './common/cdk-document-click.directive';
import { CdkReadyDirective } from './common/cdk-ready.directive';


const CDK_DIRECTIVES = [
  CdkAnchorDirective,
  CdkScrollBarDirective,
  CdkDocumentClickDirective,
  CdkReadyDirective
];
const CDK_DIRECTIVE_SERVICES = [
  {
    provide: 'WINDOW',
    useFactory: winFactory
  }
];

@NgModule({
  imports: [
  ],
  declarations: CDK_DIRECTIVES,
  exports: [...CDK_DIRECTIVES],
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
