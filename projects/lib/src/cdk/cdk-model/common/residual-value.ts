import { Library } from '@lernender/core';

export class ResidualValue {
  // To store low value
  public low?: string;
  // To store High value
  public STD?: string;
  //
  // Constructor()
  //
  constructor();

  constructor(options: object);
  constructor(options?: any) {
    this.low = Library.init(options, 'low');
    this.STD = Library.init(options, 'STD');
  }
}
