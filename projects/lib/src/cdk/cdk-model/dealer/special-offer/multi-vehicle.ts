import { Library } from '@lernender/core';

export class MultiVehicle {
  public cashAmount: string;
  public subTypeLabels: string;
  public stackableWithLease: boolean;
  public maxLeaseTerm: string;
  public stackableWithApr: string;
  public maxAprTerm: string;
  public requiresTfsFinancing: boolean;
  public cannotBeCombinedWith: any;
  //
  // Constructor
  //
  constructor();

  constructor(options: object);
  constructor(options?: any) {
    this.cashAmount = Library.init(options, 'cashAmount');
    this.subTypeLabels = Library.init(options, 'subTypeLabels');
    this.stackableWithLease = Library.init(
      options,
      'stackableWithLease',
      false
    );
    this.maxLeaseTerm = Library.init(options, 'maxLeaseTerm');
    this.stackableWithApr = Library.init(options, 'stackableWithApr');
    this.maxAprTerm = Library.init(options, 'maxAprTerm');
    this.requiresTfsFinancing = Library.init(
      options,
      'requiresTfsFinancing',
      false
    );
    this.cannotBeCombinedWith = Library.init(
      options,
      'cannotBeCombinedWith',
      {}
    );
  }
}
