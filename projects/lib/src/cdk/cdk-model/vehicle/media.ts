import { Library } from '@lernender/core';

export class Media {
  public type: string;
  public href: string;
  public size: string;
  public imageTag: string;
  /*
   * Constructor()
   */
  constructor();

  constructor(options: object);
  constructor(options?: any) {
    this.type = Library.init(options, 'type');
    this.href = Library.init(options, 'href');
    this.size = Library.init(options, 'size');
    this.imageTag = Library.init(options, 'imageTag');
  }
}
