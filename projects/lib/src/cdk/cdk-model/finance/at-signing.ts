import { Library } from '@lernender/core';

export class AtSigning {
  public acquisitionFee: number;
  public monthlyPayment: number;
  public securityDeposit: number;
  //
  // Constructor
  //
  constructor();

  constructor(options: object);
  constructor(options?: any) {
    this.acquisitionFee = parseFloat(
      Library.init(options, 'acquisitionFee', '0')
    );
    this.monthlyPayment = parseFloat(
      Library.init(options, 'monthlyPayment', '0')
    );
    this.securityDeposit = parseFloat(
      Library.init(options, 'securityDeposit', '0')
    );
  }
}
