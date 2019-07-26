import { Library } from '@lernender/core';

export class Transmission {
  public transmissionType: string;
  /*
   * Constructor()
   */
  constructor();

  constructor(options: object);
  constructor(options?: any) {
    this.transmissionType = Library.init(options, 'transmissionType');
  }
}
