export class NgForOfContext {
  public $implicit: any;
  public ngForOf: any;
  public index: number;
  public count: number;

  constructor();
  constructor($implicit: any, ngForOf: any, index: any, count: any);
  constructor($implicit?: any, ngForOf?: any, index?: any, count?: any) {
    this.$implicit = $implicit;
    this.ngForOf = ngForOf;
    this.index = index;
    this.count = count;
  }

  get first() {
    return this.index === 0;
  }
  get last() {
    return this.index === this.count - 1;
  }
  get even() {
    return this.index % 2 === 0;
  }
  get odd() {
    return !this.even;
  }
}
