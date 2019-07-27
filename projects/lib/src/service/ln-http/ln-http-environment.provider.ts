import { InjectionToken } from '@angular/core';
import {
  IEnvironment
} from '../../cdk/cdk-model/service/environment';

export interface ILnHttpEnvironmentSettings extends IEnvironment {};
export interface LnHttpEnvironmentConfig extends Array<any> {}
export const deafultLnHttpEnvironmentConfig: LnHttpEnvironmentConfig = [];

export const TM_HTTP_ENVIRONMENT_CONFIG = new InjectionToken<
  LnHttpEnvironmentConfig
>('ln-http-environment-config');
