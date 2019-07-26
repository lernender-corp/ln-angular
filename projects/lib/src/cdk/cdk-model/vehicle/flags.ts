import { Library } from '@lernender/core';

export class Flags {
  public trac?: boolean;
  public damaged?: boolean;
  public fleet?: boolean;
  public safetyConnect?: boolean;
  public tradeEligible?: boolean;
  public entune?: boolean;
  public xmRadio?: boolean;
  public ssc?: boolean;
  public dealerProtect?: boolean;
  /*
   * Constructor()
   */
  constructor();

  constructor(options: object);
  constructor(options?: any) {
    this.trac = Library.init(options, 'trac', false);
    this.damaged = Library.init(options, 'damaged', false);
    this.fleet = Library.init(options, 'fleet');
    this.safetyConnect = Library.init(options, 'safetyConnect', false);
    this.tradeEligible = Library.init(options, 'tradeEligible', false);
    this.entune = Library.init(options, 'entune');
    this.trac = Library.init(options, 'trac');
    this.xmRadio = Library.init(options, 'xmRadio');
    this.ssc = Library.init(options, 'ssc', false);
    this.dealerProtect = Library.init(options, 'dealerProtect', false);
  }
}
