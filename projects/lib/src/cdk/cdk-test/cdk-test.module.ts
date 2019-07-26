import { ModuleWithProviders, NgModule } from '@angular/core';

//
// Services
//
import { MockNgZone } from './mock-ng-zone';

@NgModule({
  imports: [],
  declarations: [],
  providers: [MockNgZone]
})
export class CdkTestModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: CdkTestModule,
      providers: [MockNgZone]
    };
  }
}
