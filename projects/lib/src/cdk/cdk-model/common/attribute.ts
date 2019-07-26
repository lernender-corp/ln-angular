import { Library } from '@lernender/core';

export class Attribute {
  public attribNm: string;
  public attribValue: string;

  //
  // Constructor
  //
  constructor();

  constructor(options: object);
  constructor(options?: any) {
    this.attribNm = Library.init(options, 'attribNm');
    this.attribValue = Library.init(options, 'attribValue');
  }
}
