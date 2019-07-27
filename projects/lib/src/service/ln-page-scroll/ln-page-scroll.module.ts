import { NgModule, ModuleWithProviders } from '@angular/core';
import { PageScrollConfig } from '../../cdk';
//
// Authentication
//
import { LnPageScrollService } from './ln-page-scroll.service';
import {
  NGXPS_CONFIG,
  defaultPageScrollConfig
} from './ln-page-scroll.provider';

@NgModule({
  imports: [],
  providers: [LnPageScrollService]
})
export class LnPageScrollModule {
  public static forRoot(
    config: PageScrollConfig = defaultPageScrollConfig
  ): ModuleWithProviders {
    return {
      ngModule: LnPageScrollModule,
      providers: [
        LnPageScrollService,
        { provide: NGXPS_CONFIG, useValue: config }
      ]
    };
  }
}
