// tslint:disable:component-selector
import {
  Component,
  Input,
  ViewEncapsulation,
  ElementRef
} from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'ln-carousel-item',
  templateUrl: 'ln-carousel-item.html',
  styleUrls: ['ln-carousel-item.css'],
  encapsulation: ViewEncapsulation.None
})
export class LnCarouselItem {
  @Input() public uid: string | number;
  @Input() public style: object;

  public el: ElementRef;

  constructor(el: ElementRef) {
    this.uid = '';
    this.el = el;
    this.style = {};
  }
}
