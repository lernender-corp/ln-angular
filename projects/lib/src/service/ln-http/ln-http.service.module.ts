import { NgModule, ModuleWithProviders } from '@angular/core';
/**
 * Services
 */
import { LnHttpService } from './ln-http.service';
import { LnHttpEnvironmentService } from './ln-http-environment.service';
import {
  LnHttpEnvironmentConfig,
  TM_HTTP_ENVIRONMENT_CONFIG
} from './ln-http-environment.provider';

@NgModule({
  imports: [],
  providers: [LnHttpService, LnHttpEnvironmentService]
})
export class LnHttpServiceModule {
  /**
   * forRoot()
   */
  public static forRoot(config: LnHttpEnvironmentConfig = []): ModuleWithProviders {
    return {
      ngModule: LnHttpServiceModule,
      providers: [
        LnHttpService,
        LnHttpEnvironmentService,
        { provide: TM_HTTP_ENVIRONMENT_CONFIG, useValue: config['default'] }
      ]
    };
  }
}
