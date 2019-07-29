import { ModuleWithProviders, NgModule } from '@angular/core';
//
// Services
//
import { CdkDateTimeService } from './common/cdk-datetime.service';
import { CdkNodeService } from './common/cdk-node.service';
import { CdkMessageService } from './common/cdk-message.service';
import { WINDOW_PROVIDERS } from './common/cdk-window.service';

const CDK_SERVICES = [
  CdkDateTimeService,
  CdkNodeService,
  CdkMessageService,
  {
    provide: 'WINDOW',
    useFactory: windowFactory
  },
  WINDOW_PROVIDERS
];

@NgModule({
  imports: [],
  providers: CDK_SERVICES
})
export class CdkServiceModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: CdkServiceModule,
      providers: CDK_SERVICES
    };
  }
}

export function windowFactory() {
  return window;
}
