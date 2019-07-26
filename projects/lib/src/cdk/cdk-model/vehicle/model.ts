import { Library } from '@lernender/core';

export class Model {
  public modelCd: string;
  public marketingName: string;
  public modelCode: string;
  public phaseCd: string;
  /*
   * Constructor()
   */
  constructor();

  constructor(options: object);
  constructor(options?: any) {
    this.modelCd = Library.init(options, 'modelCd', '');
    this.marketingName = Library.init(options, 'marketingName', '');
    this.modelCode = Library.init(options, 'modelCode');
    this.phaseCd = Library.init(options, 'phaseCd', '');
  }
}
