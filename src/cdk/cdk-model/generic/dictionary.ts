

//
//  interface: IDictionary
//
export interface IDictionary<T> {
  add(key: string, value: T);
  containsKey(key: string): boolean;
  count(): number;
  item(key: string): T;
  keys(): string[];
  remove(key: string): T;
  values(): T[];
}

//
//  class: Dictionary
//
//  description: The purpose of this class is to hold (n) number of endpoints
//  and per hosted environment in addition authentication per hosted environment
//  is percisted.
//
export class Dictionary<T> implements IDictionary<T> {
  private _items: { [index: string]: T };
  private _count: number = 0;

  public containsKey(key: string): boolean {
    return this._items.hasOwnProperty(key);
  }

  public count(): number {
    return this._count;
  }

  public add(key: string, value: T) {
    if (!this._items.hasOwnProperty(key)) { this._count++; }

    this._items[key] = value;
  }

  public remove(key: string): T {
    let val = this._items[key];
    delete this._items[key];
    this._count--;
    return val;
  }

  public item(key: string): T {
    return this._items[key];
  }

  public keys(): string[] {
    let keySet: string[] = [];

    for (let prop in this._items) {
      if (this._items.hasOwnProperty(prop)) {
        keySet.push(prop);
      }
    }

    return keySet;
  }

  public values(): T[] {
    let values: T[] = [];

    for (let prop in this._items) {
      if (this._items.hasOwnProperty(prop)) {
        values.push(this._items[prop]);
      }
    }

    return values;
  }
  //
  // Constructor
  //
  constructor();
  constructor(options: object);
  constructor(options: any = {}) {
    this._items = {};
    Object.keys(options).forEach(key => {
      this.add(key, options[key]);
    });
  }
}
