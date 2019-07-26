import { Library } from '@lernender/core';
import { RegexCollection } from '../../cdk-library/cdk-regex-collection';

export class Option {
  public optionCd: string;
  public marketingName: string;
  public marketingLongName: string;
  public optionType: string;
  public packageInd: boolean;
  public msrp: number;
  public dealerInvoicePrice: number;

  /*
   * Constructor()
   */
  constructor();

  constructor(options: object);
  constructor(options?: any) {
    this.optionCd = Library.init(options, 'optionCd');
    // Clean out "[*]", "(*)", and "<*>" from string
    // TODO: remove regex when EFC clean out vehicles' option marketing name
    this.marketingName = Library.init(options, 'marketingName', '').replace(RegexCollection.marketingName, '');
    this.marketingLongName = Library.init(options, 'marketingLongName');
    this.optionType = Library.init(options, 'optionType');
    this.packageInd = Library.init(options, 'packageInd', false);
    this.msrp = Library.init(options, 'msrp', 0);
    this.dealerInvoicePrice = Library.init(options, 'dealerInvoicePrice', 0);
  }

  public isInterior() {
    return false;
  }

  public isEterior() {
    return false;
  }
}
