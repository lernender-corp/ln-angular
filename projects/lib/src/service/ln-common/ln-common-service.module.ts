import { NgModule, ModuleWithProviders } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

/**
 * Services
 */
import { LnMessageBusService } from './ln-message-bus.service';
import { LnTextFileService } from './ln-text-file.service';

@NgModule({
  imports: [HttpClientModule],
  declarations: [],
  providers: [LnMessageBusService, LnTextFileService]
})
export class LnCommonServiceModule {
  /**
   * forRoot()
   */
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: LnCommonServiceModule,
      providers: [LnMessageBusService, LnTextFileService]
    };
  }
}
