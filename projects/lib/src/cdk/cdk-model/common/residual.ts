import { ResidualValue } from './residual-value';
import { Library } from '@lernender/core';

export class Residual {
  // To store contract terms
  public contractTerms?: string;
  // To store residualValues
  public residualValue?: ResidualValue;
  //
  // Constructor()
  //
  constructor();

  constructor(options: object);
  constructor(options?: any) {
    this.contractTerms = Library.init(options, 'contractTerms');
    this.residualValue = new ResidualValue(options.residualValue);
  }
}
