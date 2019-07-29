import { Library } from '@lernender/core';

export class BuildPageSet {
  public length: number;
  public index: number;
  public size: number;
  public pages: any[];
  /**
   * page()
   */
  page() {
    if (this.hasPages()) {
      return this.pages[this.index - 1];
    }

    return {
      id: 0,
      start: 0,
      end: 0
    };
  }

  /**
   * clear()
   */
  clear() {
    //
    // Clear pages
    //
    if (Library.isArray(this.pages)) {
      this.pages.splice(0, this.pages.length);
    }
  }

  /**
   * hasPages()
   * @returns {boolean}
   */
  hasPages() {
    if (Library.isArray(this.pages)) {
      return this.pages.length > 0;
    }

    return false;
  }

  /**
   * next()
   * @returns {number|*}
   */
  next() {
    this.index += 1;
    if (this.index > this.pages.length) {
      this.index = 1;
    }
    return this.index;
  }

  /**
   * sets()
   * @returns {number}
   */
  sets() {
    return Math.ceil(this.length / this.size);
  }

  /**
   * _createSets()
   * @returns {*}
   */
  _createSets() {
    //
    // Clear pages
    //
    this.clear();
    //
    // Loop through the page sets
    //
    for (let i = 1; i < this.sets() + 1; i++) {
      this.pages.push({
        id: i,
        start: this.size * i - this.size,
        end: i < this.sets() ? this.size * i - 1 : this.length - 1
      });
    }
  }

  constructor(options) {
    this.pages = [];
    this.size = Library.init(options, 'size', 10);
    this.length = Library.init(options, 'length', 0);
    this.index = Library.init(options, 'index', 1);
    //
    // Create Sets
    //
    this._createSets();
  }
}
