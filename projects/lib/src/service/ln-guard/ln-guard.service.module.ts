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

import { LnAuthenticationGuardService } from './ln-authentication-guard.service';

@NgModule({
  imports: [RouterModule, LnAuthenticationServiceModule],
  providers: [LnAuthenticationGuardService]
})
export class LnGuardServiceModule {
  public static forRoot(
    config: AuthenticationConfig = defaultAuthenticationConfig
  ): ModuleWithProviders {
    return {
      ngModule: LnGuardServiceModule,
      providers: [
        { provide: AUTH_CONFIG, useValue: config },
        {
          provide: LnAuthenticationService,
          useFactory: AuthenticationServiceFactory,
          deps: [AUTH_CONFIG]
        },
        LnAuthenticationGuardService
      ]
    };
  }
}
