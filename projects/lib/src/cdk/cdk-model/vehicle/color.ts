import { RegexCollection } from '../../cdk-library/cdk-regex-collection';
import { Library } from '@lernender/core';
import { CommonColor } from './commonColor';
export class Color {
  public colorCd: string;
  public marketingName: string;
  public colorSwatch: string;
  public colorHexCd: string;
  public nvsName: string;
  public commonName: CommonColor;

  hasColorCd() {
    return Library.isStringWithLength(this.colorCd);

  }
  hasColorHex() {
    return Library.isStringWithLength(this.colorHexCd);
  }
  /*
   * Constructor()
   */
  constructor();

  constructor(options: object);
  constructor(options?: any) {
    this.colorCd = Library.init(options, 'colorCd', '');
    this.colorSwatch = Library.init(options, 'colorSwatch', '');
    this.colorHexCd = Library.init(options, 'colorHexCd', '');
    this.commonName = new CommonColor(Library.init(options, 'commonName', {}));
    // Clean out "[*]", "(*)", "<*>", and "&reg;" from string
    // TODO: remove regex when EFC clean out vehicles' color marketing name
    this.marketingName = Library.init(options, 'marketingName', '').replace(RegexCollection.marketingName, '').replace(/&reg;/g, '®');
    this.nvsName = Library.init(options, 'nvsName');
  }

  public isInteriorColor() {
    return (
      Library.isStringWithLength(this.colorSwatch) &&
      Library.isUndefined(this.colorHexCd)
    );
  }

  public isExteriorColor() {
    return (
      Library.isStringWithLength(this.colorHexCd) &&
      Library.isUndefined(this.colorSwatch)
    );
  }

  public tooltip() {
    return `${this.nvsName} (${this.colorCd})`;
  }

  public hexColor() {
    return `#${this.colorHexCd}`;
  }
}
