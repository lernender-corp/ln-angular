import { Library, Image, Action } from '@lernender/core';
import { MarketingSeries } from '../common/market-series';
import { Attribute } from '../common/attribute';

export class DealerOption extends Action {
  public dealerCd: string;
  public partNbr: string;
  public marketingName: string;
  public disclaimer: string;
  public marketingSeries: MarketingSeries[];
  public category: string;
  public msrp: number;
  public dealerInvoice: number;
  public retailPrice: string;
  public toyotaStandard: boolean;
  public thumbNailImgPath: string;
  public detailImgPath: string;
  public activeStatus: string;
  public attributes: Attribute[];
  public productId: number;
  public subcategoryId: number;
  public fileName: string;
  public updatedAt: string;
  public image: Image;
  public style: object;
  /*
   * Constructor()
   */
  constructor();

  constructor(options: object);
  constructor(options?: any) {
    super(options);
    this.dealerCd = Library.init(options, 'dealerCd');
    this.partNbr = Library.init(options, 'partNbr');
    this.marketingName = Library.init(options, 'marketingName');
    this.disclaimer = Library.init(options, 'disclaimer');
    this.marketingSeries = Library.init(options, 'marketingSeries', []);
    this.category = Library.init(options, 'category');
    this.msrp = Library.init(options, 'msrp', 0);
    this.dealerInvoice = Library.init(options, 'dealerInvoice', 0);
    this.retailPrice = Library.init(options, 'retailPrice', 0);
    this.marketingSeries = [];
    if (Library.hasOwnProperty(options, 'marketingSeries')) {
      this.marketingSeries = options.marketingSeries.map(
        o => new MarketingSeries(o)
      );
    }
    this.toyotaStandard = Library.init(options, 'toyotaStandard', true);
    this.thumbNailImgPath = Library.init(options, 'thumbNailImgPath');
    this.detailImgPath = Library.init(options, 'detailImgPath');
    this.activeStatus = Library.init(options, 'activeStatus');
    this.productId = Library.init(options, 'productId', 0);
    this.attributes = [];
    if (Library.hasOwnProperty(options, 'attributes')) {
      this.attributes = options.attributes.map(o => new Attribute(o));
    }
    this.subcategoryId = Library.init(options, 'subcategoryId', 0);
    this.fileName = Library.init(options, 'fileName');
    this.updatedAt = Library.init(options, 'updatedAt');
    this.style = {
        height: '240',
        width: '340',
      ...Library.init(options, 'style', {})
    };
    this.image = new Image(
      {
          href: this.detailImgPath,
          style: {
            height: '240',
            width: '362',
            borderRadius: '5px 5px 0 0'
          },
        ...Library.init(options, 'image', {})
      }
    );
  }

  public hasImage() {
    return (
      Library.isObject(this.image) &&
      Library.isStringWithLength(this.image.href)
    );
  }
}
