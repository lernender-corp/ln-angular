import { NgModule, ModuleWithProviders } from '@angular/core';
import { AuthenticationConfig } from '../../cdk';
//
// Authentication
//
import { LnAuthenticationService } from './ln-authentication.service';
import {
  AUTH_CONFIG,
  defaultAuthenticationConfig
} from './ln-authentication.service.provider';

@NgModule({
  imports: [],
  providers: [LnAuthenticationService]
})
export class LnAuthenticationServiceModule {
  public static forRoot(
    config: AuthenticationConfig = defaultAuthenticationConfig
  ): ModuleWithProviders {
    return {
      ngModule: LnAuthenticationServiceModule,
      providers: [
        LnAuthenticationService,
        { provide: AUTH_CONFIG, useValue: config }
      ]
    };
  }
}
