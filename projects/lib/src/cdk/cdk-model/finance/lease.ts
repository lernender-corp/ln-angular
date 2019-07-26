import { Library } from '@lernender/core';
import { Tier } from './tier';
import { AtSigning } from './at-signing';

export class Lease {
  public tiers: Tier[];
  public acquisitionFee: number;
  public dispositionFee: number;
  public subventionDollarAmount: number;
  public dealerCash: number;
  public downPayment: number;
  public vehicleSellingPrice: number;
  public dueAtSigning: AtSigning[];

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
    this.acquisitionFee = parseFloat(
      Library.init(options, 'acquisitionFee', '0')
    );
    this.dispositionFee = parseFloat(
      Library.init(options, 'dispositionFee', '0')
    );
    this.subventionDollarAmount = parseFloat(
      Library.init(options, 'subventionDollarAmount', '0')
    );
    this.dealerCash = parseFloat(Library.init(options, 'dealerCash', '0'));
    this.downPayment = parseFloat(Library.init(options, 'downPayment', '0'));
    this.vehicleSellingPrice = parseFloat(
      Library.init(options, 'vehicleSellingPrice', '0')
    );
    this.dueAtSigning = [];
    if (Library.hasOwnProperty(options, 'dueAtSigning')) {
      if (Library.isArrayWithLength(options.dueAtSigning)) {
        this.dueAtSigning = options.dueAtSigning.map(t => new AtSigning(t));
      }
    }
  }

  public getTitle() {
    const atSigning = this.dueAtSigning[0];
    //
    // SDL Need to check this
    //
    const title = `$${atSigning.monthlyPayment} ${
      atSigning.acquisitionFee
    } months ${atSigning.securityDeposit} down`;
    return title;
  }
}
