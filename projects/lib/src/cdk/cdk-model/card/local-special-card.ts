import { Image, Library } from '@lernender/core';
import { DefaultCard } from './default-card';

export class LocalSpecialCard extends DefaultCard {
  public duration: number;
  public durationTerm: string;
  public downpayment: number;
  public downpaymentCondition: string;
  public monthlypayment: number;
  public term: string;
  public price: number;
  public image: Image;
  public animate: boolean;
  public style: object;

  /*
   * Constructor()
   */
  constructor();

  constructor(options: object);
  constructor(options?: any) {
    super(options);
    this.duration = Library.init(options, 'duration', 0);
    this.durationTerm = Library.init(options, 'term');
    this.downpayment = Library.init(options, 'downpayment', 0);
    this.downpaymentCondition = Library.init(options, 'downpaymentCondition');
    this.monthlypayment = Library.init(options, 'monthlypayment', 0);
    this.term = Library.init(options, 'term');
    this.animate = Library.init(options, 'animate', true);
    this.price = Library.init(options, 'price');
    this.style = {
        height: '240',
        width: '340',
      ...Library.init(options, 'style', {})
    };
    this.image = new Image(
      {
          style: {
            height: '240',
            width: '362',
            borderRadius: '5px 5px 0 0'
          },
        ...Library.init(options, 'image', {})
      }
    );
  }
}
