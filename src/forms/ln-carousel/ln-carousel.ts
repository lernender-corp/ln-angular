// tslint:disable:component-selector
import {
  Component,
  Input,
  ContentChildren,
  QueryList,
  AfterViewInit,
  ElementRef,
  Renderer2,
  ViewChild,
  ViewEncapsulation,
  Output,
  EventEmitter
} from '@angular/core';
import { Library, Guid, PageSet, Page } from '@lernender/core';

//
// Carousel Item
//
import { LnCarouselItem } from '@lernender/forms/ln-carousel-item';

@Component({
  moduleId: module.id,
  selector: 'ln-carousel',
  templateUrl: 'ln-carousel.html',
  styleUrls: ['ln-carousel.css'],
  encapsulation: ViewEncapsulation.None
})
export class LnCarousel implements AfterViewInit {
  public pages: Page[];
  @Input() public hidden: boolean;
  @Input('page-size') public _pageSize: number;
  @Input() public index: number;
  @Input() public indicators: boolean;
  @Input() public style: object;
  @Output() public onChange: EventEmitter<any> = new EventEmitter<any>();
  //
  // Children Content
  //
  @ContentChildren(LnCarouselItem) public children: QueryList<LnCarouselItem>;
  //
  // Public Variables
  //
  public uid: string;
  @ViewChild('carousel', { static: true }) private carousel: ElementRef;
  //
  // Private Variables
  //
  private _pageSet: PageSet;

  /**
   * constructor()
   */
  constructor(private _render: Renderer2) {
    this._pageSet = new PageSet({});
    this.hidden = false;
    this.indicators = true;
    this._pageSize = 1;
    this.index = 1;
    this.uid = Guid.CHAR();
    this.style = {};
    this.pages = [];
  }

  /**
   * onNav()
   * @param $event
   */
  public onNav($event: MouseEvent) {
    const target = $event.currentTarget['dataset']['toggle'];
    switch (target) {
      case 'left':
        this.prev($event);
        break;
      case 'right':
      default:
        this.next($event);
        break;
    }
  }

  /**
   * onSwipeLeft()
   * @param $event
   */
  public onSwipeLeft($event: MouseEvent) {
    this.next($event);
  }

  /**
   * onSwipeRight()
   * @param $event
   */
  public onSwipeRight($event: MouseEvent) {
    this.prev($event);
  }

  /**
   * onPage()
   * @param item
   */
  public onPage($event: MouseEvent, item) {
    this._pageSet.indexId = item.id;
    this._setActivePage();
    this._drawPage($event);
  }

  /**
   * getPages()
   */
  public getPages() {
    if (Library.isDefined(this._pageSet)) {
      if (this._pageSet.hasPages()) {
        this.orderChildren();
        return this._pageSet.pages();
      }
    }
  }

  /**
   * getPageSet()
   */
  public getPageSet() {
    return this._pageSet;
  }

  /**
   * next()
   */
  public next($event: MouseEvent) {
    this._pageSet.next();
    this._setActivePage();
    this._drawPage($event);
  }

  /**
   * prev()
   */
  public prev($event: MouseEvent) {
    this._pageSet.previous();
    this._setActivePage();
    this._drawPage($event);
  }

  public ngAfterViewInit() {
    const items: LnCarouselItem[] = this.children.toArray();
    setTimeout(() => {
      if (Library.isArrayWithLength(items)) {
        this._pageSet = new PageSet({
          pageSize: this._pageSize,
          length: items.length,
          indexId: this.index
        });
        if (this._pageSet.hasPages()) {
          //
          // Set the Default Active Page
          //
          this._pageSet.pages()[0].active = true;
          this._pageSet.indexId = 1;
          this.orderChildren();
        }
      }
      this.pages = this.getPages();
    });
  }

  private _setActivePage() {
    const active = this._pageSet.ActivePage();
    this._pageSet.pages().forEach(page => {
      page.active = active.id === page.id;
    });

    if (Library.isDefined(this.onChange)) {
      const el = this.children['_results'][
        this._pageSet.ActivePage().range.start
      ];
      this.onChange.emit({ uid: el.uid });
    }
  }

  /**
   * _drawPage()
   */
  private _drawPage(element: MouseEvent) {
    if (typeof element.stopPropagation === 'function') {
      element.preventDefault();
      element.stopPropagation();
    }

    const target = Library.hasOwnProperty(element, 'type')
      ? element.type
      : element.currentTarget['dataset']['toggle'];

    switch (target) {
      case 'swipeleft':
      case 'left':
        this.carousel.nativeElement.classList.add('is-set', 'is-reversing');
        break;
      case 'swiperight':
      case 'right':
      default:
        this.carousel.nativeElement.classList.remove('is-reversing');
        break;
    }
    //
    // Active Page
    //
    const indexId = this._pageSet.indexId;
    //
    // Order Child Components of type LnCarouselItem
    //
    this.orderChildren();
    //
    // Rest to Active Page
    //
    this._pageSet.indexId = indexId;
  }

  //
  // orderChildren()
  //
  private orderChildren() {
    //
    // Set the flex basis based on the page size.
    //
    let orderId = 1;
    while (orderId <= this.children.length) {
      const el = this.children['_results'][
        this._pageSet.ActivePage().range.start
      ]['el'];
      this._render.setStyle(el.nativeElement, 'order', `${orderId}`);
      this._pageSet.next();
      orderId++;
    }
  }
}
