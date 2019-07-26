import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { LnRouterLink } from './ln-routerlink';

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [LnRouterLink],
  exports: [LnRouterLink]
})
export class LnRouterLinkModule {}
