import { NgModule, ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthenticationConfig } from '../../cdk';

import {
  LnAuthenticationServiceModule,
  LnAuthenticationService,
  AUTH_CONFIG,
  defaultAuthenticationConfig,
  AuthenticationServiceFactory
} from '../ln-authentication';

import { LnInterceptorService } from './ln-interceptor.service';

@NgModule({
  imports: [RouterModule, LnAuthenticationServiceModule],
  providers: [LnInterceptorService]
})
export class LnInterceptorServiceModule {
  public static forRoot(
    config: AuthenticationConfig = defaultAuthenticationConfig
  ): ModuleWithProviders {
    return {
      ngModule: LnInterceptorServiceModule,
      providers: [
        { provide: AUTH_CONFIG, useValue: config },
        {
          provide: LnAuthenticationService,
          useFactory: AuthenticationServiceFactory,
          deps: [AUTH_CONFIG]
        },
        LnInterceptorService
      ]
    };
  }
}
