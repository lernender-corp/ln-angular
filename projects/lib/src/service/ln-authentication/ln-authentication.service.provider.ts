import { InjectionToken } from '@angular/core';
import { AuthenticationConfig } from '../../cdk';

export const AUTH_CONFIG = new InjectionToken<AuthenticationConfig>(
  'auth_config'
);

export const defaultAuthenticationConfig: AuthenticationConfig = {
  baseUrl: 'localhost'
};

export function AuthenticationServiceFactory(config) {
  return new AuthenticationConfig(config);
}
