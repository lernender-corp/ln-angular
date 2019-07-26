import { Library, Base, Image } from '@lernender/core';

export class Carousel extends Base {
  public items: Image[];

  private _enumeratedIndex: number;


  constructor();

  constructor(options: object);
  constructor(options?: any) {
    super(options);
    this.items = [];
    this._enumeratedIndex = Library.init(options, 'enumeratedIndex', -1);
    if (Library.hasOwnProperty(options, 'items')) {
      if (Library.isArrayWithLength(options.items)) {
        let nI = this._enumeratedIndex;
        this.items = options.items.map(item => {
          nI++;
          return new Image(
            {...item,
              id: nI,
              active: nI === 0,
              style: { width: '100%' }}
          );
        });
      }
    }
  }
}
