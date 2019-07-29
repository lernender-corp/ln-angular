import {
  Directive,
  OnDestroy,
  Inject,
  Output,
  Input,
  OnInit,
  EventEmitter,
  ElementRef
} from '@angular/core';
import { Library } from '@lernender/core';

import { getStyle, injectCSS } from './../../cdk-library/cdk-style-functions';

const SCROLLBAR_CLASS = `__cdk-scrollbar__`;
const SCROLLBAR_CSS = `
.CLASS::-webkit-scrollbar{background-color:#fff;width:16px}
.CLASS::-webkit-scrollbar-track{background-color:#fff}
.CLASS::-webkit-scrollbar-thumb{background-color:#ff0000;border-radius:16px;border:4px solid #fff}
.CLASS::-webkit-scrollbar-button{display:none}.scrollbar::-webkit-scrollbar{background-color:#fff;width:16px}
.CLASS::-webkit-scrollbar-track{background-color:#fff}
.CLASS::-webkit-scrollbar-thumb{background-color:#babac0;border-radius:16px;border:4px solid #fff}
.CLASS::-webkit-scrollbar-button{display:none}`;

@Directive({
  selector: '[cdkScrollBar]'
})
export class CdkScrollBarDirective implements OnInit, OnDestroy {
  @Output() public cdkScrollBar: EventEmitter<any> = new EventEmitter();
  @Input() public set direction(dir: string) {
    if (Library.isStringWithLength(dir)) {
      dir = dir.toLowerCase();
      if (dir === 'vertical' || dir === 'horizontal') {
        this._direction = dir;
      }
    }
  }

  public get direction() {
    return this._direction;
  }

  @Input() public set threshold(threshold: number) {
    if (Library.isStringWithLength(threshold)) {
      this._threshold = threshold;
    }
  }

  public get threshold() {
    return this._threshold;
  }

  private _direction: string;
  private _threshold: number;

  //
  // Constructor
  //
  constructor(
    @Inject('WINDOW') private window: any,
    private _elementRef: ElementRef
  ) {
    this._direction = 'vertical';
    this._threshold = .90;
  }

  //
  // ngOnInit()
  //
  public ngOnInit() {
    //
    // Add Event Listener
    //
    if (Library.isDefined(this.cdkScrollBar)) {
      this.window.addEventListener('scroll', this.onWindowScroll.bind(this), true);
    }

    if (Library.isUndefined(getStyle(this.window, `.${SCROLLBAR_CLASS}`))) {
      injectCSS(document, SCROLLBAR_CSS.replace(/CLASS/g, SCROLLBAR_CLASS));
    }

    //
    // Add the classname to this element
    //
    this._elementRef.nativeElement.classList.add(SCROLLBAR_CLASS);
  }

  //
  // Windows Scroll Event
  //
  public onWindowScroll($event) {
    const target = $event.target;
    const load =
      this._direction === 'horizontal'
        ? target.clientWidth / (target.scrollWidth - target.scrollLeft) >= this._threshold
        : target.clientHeight / (target.scrollHeight - target.scrollTop) >= this._threshold;

    if (load) {
      if (Library.isDefined(this.cdkScrollBar)) {
        this.cdkScrollBar.emit(target);
      }
    }
  }

  //
  // OnDestroy()
  //
  public ngOnDestroy() {
    if (Library.isDefined(this.cdkScrollBar)) {
      this.window.removeEventListener('scroll', this.onWindowScroll, true);
    }
  }
}
