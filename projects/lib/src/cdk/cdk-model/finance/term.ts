import { Library } from '@lernender/core';

export class Term {
  public dollarsPerThousand: number;
  public duration: number;
  public extraCashAmount: number;
  public extraCashLabel: string;
  public rate: number;
  public allowableMileage: number;
  public capitalizedCost: number;
  public dueAtSigningAmount: number;
  public leaseEndPurchase: number;
  public mileageOverageFee: number;
  public monthlyPayment: number;
  public rentChargeFactor: number;
  public securityDeposit: number;
  public totalMonthlyPayments: number;
  public grossCapCost: number;

  //
  // Constructor
  //
  constructor();

  constructor(options: object);
  constructor(options?: any) {
    this.dollarsPerThousand = parseFloat(
      Library.init(options, 'dollarsPerThousand', '0')
    );
    this.duration = parseInt(
      Library.init(options, 'duration', '0').toLowerCase(),
      10
    );
    this.extraCashAmount = parseFloat(
      Library.init(options, 'extraCashAmount', '0')
    );
    this.extraCashLabel = Library.init(options, 'extraCashLabel');
    this.rate = parseFloat(Library.init(options, 'rate', '0'));
    this.allowableMileage = parseFloat(
      Library.init(options, 'allowableMileage', '0')
    );
    this.capitalizedCost = parseFloat(
      Library.init(options, 'capitalizedCost', '0')
    );
    this.dueAtSigningAmount = parseFloat(
      Library.init(options, 'dueAtSigningAmount', '0')
    );
    this.leaseEndPurchase = parseFloat(
      Library.init(options, 'leaseEndPurchase', '0')
    );
    this.mileageOverageFee = parseFloat(
      Library.init(options, 'mileageOverageFee', '0')
    );
    this.monthlyPayment = parseFloat(
      Library.init(options, 'monthlyPayment', '0')
    );
    this.rentChargeFactor = parseFloat(
      Library.init(options, 'rentChargeFactor', '0')
    );
    this.securityDeposit = parseFloat(
      Library.init(options, 'securityDeposit', '0')
    );
    this.totalMonthlyPayments = parseFloat(
      Library.init(options, 'totalMonthlyPayments', '0')
    );
    this.grossCapCost = parseFloat(Library.init(options, 'grossCapCost', '0'));
  }
}
