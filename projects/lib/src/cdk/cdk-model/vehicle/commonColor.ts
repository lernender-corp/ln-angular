import { Library } from '@lernender/core';

export class CommonColor {
  public display: string;
  public generic: string;
  public specific: string;

  //
  // isSpecific()
  //
  public isSpecific(): Boolean  {
    return Library.isStringWithLength(this.specific);
  }
  //
  // isDisplay()
  //
  public isDisplay(): Boolean {
    return Library.isStringWithLength(this.display);
  }
  //
  // isGeneric()
  //
  public isGeneric(): Boolean {
    return Library.isStringWithLength(this.generic);
  }
  /*
   * Constructor()
   */
  constructor();

  constructor(options: object);
  constructor(options?: any) {
    this.display = Library.init(options, 'display');
    this.generic = Library.init(options, 'generic');
    this.specific = Library.init(options, 'specific');
  }
}
