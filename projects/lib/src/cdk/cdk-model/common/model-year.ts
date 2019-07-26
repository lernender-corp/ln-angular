import { Model } from '../vehicle/model';
import { Library } from '@lernender/core';

export class ModelYear {
  public year: string;
  public model: Model[];
  //
  // Constructor()
  //
  constructor();

  constructor(options: object);
  constructor(options?: any) {
    this.year = Library.init(options, 'year');
    this.model = [];
    if (Library.hasOwnProperty(options, 'model')) {
      this.model = options.model.map(o => new Model(o));
    }
  }
}
