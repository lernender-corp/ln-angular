import { Library } from '@lernender/core';

export class Cash {
  public cannotBeCombinedWith: any;
  public cashAmount: number;
  public maxAprTerm: number;
  public maxLeaseTerm: number;
  public requiresTfsFinancing: boolean;
  public stackableWithApr: boolean;
  public stackableWithLease: boolean;
  public subTypeLabels: string;

  //
  // Constructor
  //
  constructor();

  constructor(options: object);
  constructor(options?: any) {
    this.cannotBeCombinedWith = Library.init(
      options,
      'cannotBeCombinedWith',
      {}
    );
    this.cashAmount = parseFloat(Library.init(options, 'cashAmount', '0'));
    this.maxAprTerm = parseFloat(Library.init(options, 'maxAprTerm', '0'));
    this.maxLeaseTerm = parseFloat(Library.init(options, 'maxLeaseTerm', '0'));
    this.requiresTfsFinancing = Library.init(
      options,
      'requiresTfsFinancing',
      false
    );
    this.stackableWithApr = Library.init(options, 'stackableWithApr', false);
    this.stackableWithLease = Library.init(
      options,
      'stackableWithLease',
      false
    );
    this.subTypeLabels = Library.init(options, 'subTypeLabels');
  }

  public getTitle() {
    let title = '';
    title = `$${this.cashAmount} cashback`;
    return title;
  }
}
