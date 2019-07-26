import { Library } from '@lernender/core';

export class Promote {
  public title: string;
  public description: string;
  /*
   * Constructor()
   */
  constructor();

  constructor(options: object);
  constructor(options?: any) {
    this.title = Library.init(options, 'title');
    this.description = Library.init(options, 'description');
  }
}
