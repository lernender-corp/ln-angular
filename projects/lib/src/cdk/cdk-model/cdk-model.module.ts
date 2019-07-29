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
import { Color } from './vehicle/color';
import { Container } from './generic/container';
import { DealerOption } from './dealer/dealer-option';
import { Engine } from './vehicle/engine';
import { Environment } from './common/environment';
import { ExteriorColor } from './vehicle/exteriorColor';
import { FilterMessage } from './filter/filter-message';
import { Flags } from './vehicle/flags';
import { Grid } from './tabular/grid';
import { InteriorColor } from './vehicle/interiorColor';
import { MPG } from './vehicle/mpg';
import { Media } from './vehicle/media';
import { Model } from './vehicle/model';
import { MultiVehicle } from './dealer/special-offer/multi-vehicle';
import { Node } from './common/node';
import { OfferBundle } from './dealer/special-offer/offer-bundle';
import { OfferCard } from './dealer/special-offer/offer-card';
import { Option } from './vehicle/option';
import { PageScrollInstance } from './page-scroll/page-scroll-instance';
import { Pane } from './generic/pane';
import { Panel } from './generic/panel';
import { Price } from './vehicle/price';
import { Promote } from './vehicle/promote';
import { SafetyRating } from './vehicle/safetyRating';
import { SlidePanel } from './generic/slide-panel';
import { SpecialOffer } from './dealer/special-offer/special-offer';
import { StandardOption } from './vehicle/standard-option';
import { Transmission } from './vehicle/transmission';
import { Vehicle } from './vehicle/vehicle';
import { Vspec } from './vehicle/vspec';



const CDK_MODELS = [
  AuthenticationConfig,
  Carousel,
  CdkDataSource,
  Color,
  Container,
  DealerOption,
  Engine,
  Environment,
  ExteriorColor,
  FilterMessage,
  Flags,
  Grid,
  InteriorColor,
  MPG,
  Media,
  Model,
  MultiVehicle,
  Node,
  OfferBundle,
  OfferCard,
  Option,
  PageScrollInstance,
  Pane,
  Panel,
  Price,
  Promote,
  SafetyRating,
  SlidePanel,
  SpecialOffer,
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
