import { Library } from '@lernender/core';
import { Term } from './term';

export class Tier {
  public term: Term[];
  public level: number;
  //
  // Constructor
  //
  constructor();

  constructor(options: object);
  constructor(options?: any) {
    this.level = parseInt(
      Library.init(options, 'level', '0').toLowerCase(),
      10
    );
    this.term = [];
    if (Library.hasOwnProperty(options, 'term')) {
      if (Library.isArrayWithLength(options.term)) {
        this.term = options.term.map(t => new Term(t));
      }
    }
  }

  public hasTerms() {
    return Library.isArrayWithLength(this.term);
  }

  //
  // Rturn the Term with Lowest Rate and Highest Term
  //
  public getLowestAprForLongestTerm() {
    if (Library.isArrayWithLength(this.term)) {
      this.term.sort(this._compareRate);
      const rate = this.term[0].rate;
      this.term.filter(i => i.rate === rate).sort(this._compareTerm);
      return this.term[0];
    }
  }

  //
  // Sort By Rate (ascending)
  //
  private _compareRate(a, b) {
    const x = parseFloat(a.rate);
    const y = parseFloat(b.rate);

    if (x < y) { return -1; }

    if (x > y) { return 1; }

    return 0;
  }

  //
  // Sort By Term (descending)
  //
  private _compareTerm(a, b) {
    const x = parseFloat(a.duration);
    const y = parseFloat(b.duration);

    if (x > y) { return -1; }

    if (x < y) { return 1; }

    return 0;
  }
}
