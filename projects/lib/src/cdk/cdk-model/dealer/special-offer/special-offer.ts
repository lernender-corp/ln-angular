import { Library, Action } from '@lernender/core';
import { OfferBundle } from './offer-bundle';

export class SpecialOffer extends Action {
  public code: string;
  public regionCode: string;
  public tdaName: string;
  public stateName: string;
  public startingIndex: number;
  public urlRedirect: string;
  public totalOffers: number;
  public containsOffers: boolean;
  public containsErrors: boolean;
  public offerBundle: OfferBundle;
  //
  // Constructor
  //
  constructor();

  constructor(options: object);
  constructor(options?: any) {
    super(options);
    this.code = Library.init(options, 'code');
    this.regionCode = Library.init(options, 'regionCode');
    this.tdaName = Library.init(options, 'tdaName');
    this.stateName = Library.init(options, 'stateName');
    this.startingIndex = Library.init(options, 'startingIndex', 0);
    this.urlRedirect = Library.init(options, 'urlRedirect');
    this.totalOffers = Library.init(options, 'totalOffers', 0);
    this.containsOffers = Library.init(options, 'containsOffers', false);
    this.containsErrors = Library.init(options, 'containsErrors', false);
    this.offerBundle = new OfferBundle();
    if (Library.hasOwnProperty(options, 'offerBundle')) {
      this.offerBundle = new OfferBundle(options.offerBundle);
    }
  }
}
