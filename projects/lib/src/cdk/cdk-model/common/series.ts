import { Library } from '@lernender/core';

export class Series {
  public id: string | number;
  public year: number;
  public name: string;
  public included: string;
  public excluded: string;
  public includedModels: any[];
  public excludedModels: any[];
  //
  // Constructor
  //
  constructor();

  constructor(options: object);
  constructor(options?: any) {
    this.id = Library.init(options, 'id');
    this.year = parseInt(Library.init(options, 'year', '0').toLowerCase(), 10);
    this.name = Library.init(options, 'name');
    this.included = Library.init(options, 'included');
    this.excluded = Library.init(options, 'excluded');

    this.includedModels = [];
    if (Library.hasOwnProperty(options, 'includedModels')) {
      if (Library.isObject(options.includedModels)) {
        if (Library.hasOwnProperty(options.includedModels, 'includedModel')) {
          if (Library.isArrayWithLength(options.includedModels.includedModel)) {
            this.includedModels = options.includedModels.includedModel;
          }
        }
      }
    }
    this.excludedModels = [];
    if (Library.hasOwnProperty(options, 'excludedModels')) {
      if (Library.isObject(options.excludedModels)) {
        if (Library.hasOwnProperty(options.excludedModels, 'excludedModel')) {
          if (Library.isArrayWithLength(options.excludedModels.excludedModel)) {
            this.excludedModels = options.excludedModels.excludedModel;
          }
        }
      }
    }
  }
}
