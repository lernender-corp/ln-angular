import { NgModule } from '@angular/core';
import { PortalModule } from '@angular/cdk/portal';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CdkStepperModule } from '@angular/cdk/stepper';

/**
 * Common Model(s)
 */
import { Apr } from './finance/apr';
import { Attribute } from './common/attribute';
import { AuthenticationConfig } from './authentication/authentication-config';
import { Bullet } from './common/bullet';
import { Carousel } from './common/carousel';
import { CdkDataSource } from './generic/datasource';
import { Color } from './vehicle/color';
import { Container } from './generic/container';
import { DealerOption } from './dealer/dealer-option';
import { DefaultCard } from './card/default-card';
import { Engine } from './vehicle/engine';
import { Environment } from './common/environment';
import { ExteriorColor } from './vehicle/exteriorColor';
import { FilterMessage } from './filter/filter-message';
import { Flags } from './vehicle/flags';
import { Grid } from './tabular/grid';
import { InteriorColor } from './vehicle/interiorColor';
import { LocalSpecialCard } from './card/local-special-card';
import { MPG } from './vehicle/mpg';
import { MarketingSeries } from './common/market-series';
import { Media } from './vehicle/media';
import { Model } from './vehicle/model';
import { ModelYear } from './common/model-year';
import { MultiVehicle } from './dealer/special-offer/multi-vehicle';
import { Node } from './common/node';
import { Offer } from './dealer/special-offer/offer';
import { OfferBundle } from './dealer/special-offer/offer-bundle';
import { OfferCard } from './dealer/special-offer/offer-card';
import { Option } from './vehicle/option';
import { PageScrollInstance } from './page-scroll/page-scroll-instance';
import { Pane } from './generic/pane';
import { Panel } from './generic/panel';
import { Price } from './vehicle/price';
import { Promote } from './vehicle/promote';
import { SafetyRating } from './vehicle/safetyRating';
import { Series } from './common/series';
import { SlidePanel } from './generic/slide-panel';
import { SpecialOffer } from './dealer/special-offer/special-offer';
import { StandardOption } from './vehicle/standard-option';
import { Term } from './finance/term';
import { Tier } from './finance/tier';
import { Transmission } from './vehicle/transmission';
import { User } from './user/user';
import { Vehicle } from './vehicle/vehicle';
import { Vspec } from './vehicle/vspec';



const CDK_MODELS = [
  Apr,
  Attribute,
  AuthenticationConfig,
  Bullet,
  Carousel,
  CdkDataSource,
  Color,
  Container,
  DealerOption,
  DefaultCard,
  Engine,
  Environment,
  ExteriorColor,
  FilterMessage,
  Flags,
  Grid,
  InteriorColor,
  LocalSpecialCard,
  MPG,
  MarketingSeries,
  Media,
  Model,
  ModelYear,
  MultiVehicle,
  Node,
  Offer,
  OfferBundle,
  OfferCard,
  Option,
  PageScrollInstance,
  Pane,
  Panel,
  Price,
  Promote,
  SafetyRating,
  Series,
  SlidePanel,
  SpecialOffer,
  StandardOption,
  Term,
  Tier,
  Transmission,
  User,
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
