import { NgModule } from '@angular/core';
import { PortalModule } from '@angular/cdk/portal';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CdkStepperModule } from '@angular/cdk/stepper';

/**
 * Common Model(s)
 */
import { AuthenticationConfig } from './authentication/authentication-config';
import { Carousel } from './common/carousel';
import { CdkDataSource } from './generic/datasource';
import { Container } from './generic/container';
import { Environment } from './service/environment';
import { Grid } from './tabular/grid';
import { Node } from './common/node';
import { PageScrollInstance } from './page-scroll/page-scroll-instance';
import { Pane } from './generic/pane';
import { Panel } from './generic/panel';
import { SlidePanel } from './generic/slide-panel';


const CDK_MODELS = [
  AuthenticationConfig,
  Carousel,
  CdkDataSource,
  Container,
  Environment,
  Grid,
  Node,
  PageScrollInstance,
  Pane,
  Panel,
  SlidePanel,
];

@NgModule({
  imports: [PortalModule, ScrollingModule, CdkStepperModule],
  declarations: [],
  providers: CDK_MODELS
})

/**
 *   Module:  CdkModelModule
 *   Description:  The module 'CdkModelModule' is designed to ...
 *   Author: Lovelidge, Shawn
 */
export class CdkModelModule {}
