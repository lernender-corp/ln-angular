import { Library } from '@lernender/core';
export class ChangeIndicator {
  public attribute: string;
  public lastUpdatedDate: Date;

  /*
   * Constructor()
   */
  constructor();
  constructor(options: object);
  constructor(options?: any) {
    this.attribute = Library.init(options, 'attribute');
    this.lastUpdatedDate = Library.init(options, 'lastUpdatedDate');
    if (!Library.isUndefined(this.lastUpdatedDate)) {
      this.lastUpdatedDate = new Date(this.lastUpdatedDate);
    }
  }
}
