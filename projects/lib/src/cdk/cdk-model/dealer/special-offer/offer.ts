import { Library, Simple } from '@lernender/core';
import { Apr } from '../../finance/apr';
import { Bullet } from '../../common/bullet';
import { Cash } from '../../finance/cash';
import { Lease } from '../../finance/lease';
import { MultiVehicle } from './multi-vehicle';
import { OfferCard } from './offer-card';
import { Series } from '../../common/series';

export class Offer extends Simple {
  public apr: Apr;
  public cash: Cash;
  public endDate: Date;
  public lease: Lease;
  public seriesList: Series[];
  public additionalDisclaimers: string;
  public bullets: Bullet[];
  public disclaimers: string[];
  public featured: boolean;
  public fundingSource: string;
  public lang: string;
  public leaseTrimGrade: string;
  public miscellaneous: any;
  public multivehicle: MultiVehicle;
  public offerCard: OfferCard;
  public offerId: string;
  public offerImage: string;
  public offerImageAlt: string;
  public offerImageDisclaimer: string;
  public offerLabel: string;
  public offerLabelNum: string;
  public offerType: string;
  public restrictions: string[];
  public startDate: Date;
  public states: string[];
  public tfsCalculator: boolean;
  public title: string;
  public useForEmail: boolean;

  //
  // Constructor
  //
  constructor();

  constructor(options: object);
  constructor(options?: any) {
    super(options);
    this.apr = new Apr(Library.init(options, 'apr', {}));
    this.lease = new Lease(Library.init(options, 'lease', {}));
    this.multivehicle = new MultiVehicle(
      Library.init(options, 'multivehicle', {})
    );
    this.miscellaneous = Library.init(options, 'miscellaneous');
    this.tfsCalculator = Library.init(options, 'tfsCalculator', false);
    this.startDate = Library.init(options, 'startDate');
    this.endDate = Library.init(options, 'endDate');
    this.cash = new Cash(Library.init(options, 'cash', {}));
    this.seriesList = [];
    if (Library.hasOwnProperty(options, 'seriesList')) {
      if (Library.isObject(options.seriesList)) {
        if (Library.hasOwnProperty(options.seriesList, 'series')) {
          if (Library.isArrayWithLength(options.seriesList.series)) {
            this.seriesList = options.seriesList.series.map(o => new Series(o));
          }
        }
      }
    }
    this.offerCard = new OfferCard(Library.init(options, 'offerCard', {}));
    this.offerId = Library.init(options, 'offerId');
    this.offerImage = Library.init(options, 'offerImage');
    this.offerImageAlt = Library.init(options, 'offerImageAlt');
    this.offerImageDisclaimer = Library.init(options, 'offerImageDisclaimer');
    this.offerLabel = Library.init(options, 'offerLabel');
    this.offerLabelNum = Library.init(options, 'offerLabelNum');
    this.title = Library.init(options, 'title');
    this.useForEmail = Library.init(options, 'useForEmail', false);
    this.bullets = [];
    if (Library.hasOwnProperty(options, 'bullets')) {
      if (Library.isObject(options.bullets)) {
        if (Library.hasOwnProperty(options.bullets, 'bullet')) {
          if (Library.isArrayWithLength(options.bullets.bullet)) {
            this.bullets = options.bullets.bullet.map(o => new Bullet(o));
          }
        }
      }
    }
    this.disclaimers = [];
    if (Library.hasOwnProperty(options, 'disclaimers')) {
      if (Library.isObject(options.disclaimers)) {
        if (Library.hasOwnProperty(options.disclaimers, 'disclaimer')) {
          if (Library.isArrayWithLength(options.disclaimers.disclaimer)) {
            this.disclaimers = options.disclaimers.disclaimer;
          }
        }
      }
    }
    this.restrictions = [];
    if (Library.hasOwnProperty(options, 'restrictions')) {
      if (Library.isObject(options.restrictions)) {
        if (Library.hasOwnProperty(options.restrictions, 'restriction')) {
          if (Library.isArrayWithLength(options.restrictions.restriction)) {
            this.restrictions = options.restrictions.restriction;
          }
        }
      }
    }
    this.states = [];
    if (Library.hasOwnProperty(options, 'states')) {
      if (Library.isObject(options.states)) {
        if (Library.hasOwnProperty(options.states, 'state')) {
          if (Library.isArrayWithLength(options.states.state)) {
            this.states = options.states.state;
          }
        }
      }
    }
  }

  public getLabel() {
    return this.offerLabel;
  }
}
