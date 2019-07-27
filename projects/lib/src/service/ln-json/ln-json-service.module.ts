import { NgModule, ModuleWithProviders } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

/**
 * Services
 */
import { LnJsonService } from './ln-json.service';

@NgModule({
  imports: [HttpClientModule],
  providers: [LnJsonService]
})
export class LnJsonServiceModule {
  /**
   * forRoot()
   */
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: LnJsonServiceModule,
      providers: [LnJsonService]
    };
  }
}

/**
 * Default Export
 */
export * from './ln-json.service';
