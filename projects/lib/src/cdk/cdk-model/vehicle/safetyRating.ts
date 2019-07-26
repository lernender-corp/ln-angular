import { Library } from '@lernender/core';

export class SafetyRating {
  public driver: string;
  public passenger: string;
  public front: string;
  public rear: string;
  public rollover: string;
  public overall: string;
  /*
   * Constructor()
   */
  constructor();

  constructor(options: object);
  constructor(options?: any) {
    this.driver = Library.init(options, 'driver');
    this.passenger = Library.init(options, 'passenger');
    this.front = Library.init(options, 'front');
    this.rear = Library.init(options, 'rear');
    this.rollover = Library.init(options, 'rollover');
    this.overall = Library.init(options, 'overall');
  }
}
