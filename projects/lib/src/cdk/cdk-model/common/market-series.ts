import { Library, Base } from '@lernender/core';
import { ModelYear } from './model-year';

export class MarketingSeries extends Base {
  public series: string;
  public modelYear: ModelYear[];
  //
  // Constructor()
  //
  constructor();

  constructor(options: object);
  constructor(options?: any) {
    super(options);
    this.series = Library.init(options, 'series');
    this.modelYear = [];
    if (Library.hasOwnProperty(options, 'modelYear')) {
      this.modelYear = options.modelYear.map(o => new ModelYear(o));
    }
  }
}
