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
import { Engine } from './vehicle/engine';
import { Environment } from './common/environment';

import { Flags } from './vehicle/flags';
import { Grid } from './tabular/grid';

import { MPG } from './vehicle/mpg';
import { Media } from './vehicle/media';
import { Model } from './vehicle/model';
import { Node } from './common/node';
import { Option } from './vehicle/option';
import { PageScrollInstance } from './page-scroll/page-scroll-instance';
import { Pane } from './generic/pane';
import { Panel } from './generic/panel';
import { Price } from './vehicle/price';
import { Promote } from './vehicle/promote';
import { SafetyRating } from './vehicle/safetyRating';
import { SlidePanel } from './generic/slide-panel';
import { StandardOption } from './vehicle/standard-option';
import { Transmission } from './vehicle/transmission';
import { Vehicle } from './vehicle/vehicle';
import { Vspec } from './vehicle/vspec';



const CDK_MODELS = [
  AuthenticationConfig,
  Carousel,
  CdkDataSource,
  Container,
  Engine,
  Environment,

  Flags,
  Grid,

  MPG,
  Media,
  Model,
  Node,
  Option,
  PageScrollInstance,
  Pane,
  Panel,
  Price,
  Promote,
  SafetyRating,
  SlidePanel,
  StandardOption,
  Transmission,
  Vehicle,
  Vspec
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
