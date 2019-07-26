import { Library, Simple } from '@lernender/core';
import { Offer } from './offer';

export class OfferBundle extends Simple {
  public offers: Offer[];
  //
  // Constructor
  //
  constructor();

  constructor(options: object);
  constructor(options?: any) {
    super(options);
    this.offers = [];
    if (Library.hasOwnProperty(options, 'offers')) {
      this.offers = options.offers.map(o => new Offer(o));
    }
  }
}
