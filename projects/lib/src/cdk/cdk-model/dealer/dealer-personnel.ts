import { Library } from '@lernender/core';

export class DealerPersonnel {
  public dealerCd: string;
  public name: string;
  public phoneType: string;
  public phoneNo: string;
  public email: string;

  /*
   * Constructor()
   */
  constructor();

  constructor(options: object);
  constructor(options?: any) {
    this.dealerCd = Library.init(options, 'dealerCd');
    this.name = Library.init(options, 'name');
    this.phoneType = Library.init(options, 'phoneType');
    this.phoneNo = Library.init(options, 'phoneNo');
    this.email = Library.init(options, 'email');
  }
}
