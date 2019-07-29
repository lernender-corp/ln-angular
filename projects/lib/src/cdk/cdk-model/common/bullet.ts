import { Library } from '@lernender/core';

export class Bullet {
  public text: string;
  public link: string;
  //
  // Constructor
  //
  constructor();

  constructor(options: object);
  constructor(options?: any) {
    this.text = Library.init(options, 'text');
    this.link = Library.init(options, 'link');
  }
}
