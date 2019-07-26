import { Color } from './color';
import { Library } from '@lernender/core';

export class ExteriorColor extends Color {
  public primaryHexCd: string;
  /*
   * Constructor()
   */
  constructor();
  constructor(options: object);
  constructor(options?: any) {
    super(options);
    this.primaryHexCd = this.isTwoTone(this.colorHexCd, '|') ? this.colorHexCd.split('|')[0] : this.colorHexCd;
  }

  /**
   * @param colorHexCd color of string to be passed.
   * @param delimeters delimeters to be looped and applied string.search().
   * If any of  the delimeter is found, it will break the loop and return true
   */
  public isTwoTone(colorHexCd: string, ...delimeters: string[] | RegExp[]): boolean {
    if (Library.isStringWithLength(colorHexCd)) {
      return [...delimeters].some((delimeter: string | RegExp) => colorHexCd.search(delimeter) > -1);
    }
    return false;
  }
}
