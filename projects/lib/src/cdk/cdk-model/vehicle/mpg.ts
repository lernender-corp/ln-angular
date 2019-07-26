import { Library } from '@lernender/core';

export class MPG {
  public city: number;
  public highway: number;
  public combined: number;
  /*
   * Constructor()
   */
  constructor();

  constructor(options: object);
  constructor(options?: any) {
    this.city = Library.init(options, 'city', 0);
    this.highway = Library.init(options, 'highway', 0);
    this.combined = Library.init(options, 'combined', 0);
  }
}
