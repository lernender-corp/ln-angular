import { Library } from '@lernender/core';
import { Tier } from './tier';

export class Apr {
  public tiers: Tier[];

  //
  // Constructor
  //
  constructor();

  constructor(options: object);
  constructor(options?: any) {
    this.tiers = [];
    if (Library.hasOwnProperty(options, 'tiers')) {
      if (Library.isArrayWithLength(options.tiers)) {
        this.tiers = options.tiers.map(t => new Tier(t));
      }
    }
  }

  public hasTiers() {
    return Library.isArrayWithLength(this.tiers);
  }
}
