import { Library } from '@lernender/core';

export class OfferCard {
  public title: string;
  public image: string;
  public imageAlt: string;
  public badgeImage1: string;
  public badgeImage2: string;
  public badgeImage3: string;
  //
  // Constructor
  //
  constructor();

  constructor(options: object);
  constructor(options?: any) {
    this.title = Library.init(options, 'cardTitle');
    this.image = Library.init(options, 'cardImage');
    this.imageAlt = Library.init(options, 'cardImageAlt');
    this.badgeImage1 = Library.init(options, 'cardBadgeImage1');
    this.badgeImage2 = Library.init(options, 'cardBadgeImage2');
    this.badgeImage3 = Library.init(options, 'cardBadgeImage3');
  }
}
