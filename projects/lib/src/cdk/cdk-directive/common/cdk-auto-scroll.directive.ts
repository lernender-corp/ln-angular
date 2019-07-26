import {
  Directive,
  Input,
  Output,
  EventEmitter,
  HostListener
} from '@angular/core';
import { Library } from '@lernender/core';

@Directive({
  selector: '[cdkAutoScroll]'
})
export class CdkAutoScrollDirective {
  @Input()
  public parent: HTMLElement;
  @Input()
  public cdkAutoScrollClass: string;
  @Output()
  public cdkAutoScrollScroll = new EventEmitter<MouseEvent>();

  // /**
  //  * _getPageScroll()
  //  */
  // private _getPageScroll() {
  //   let yScroll;

  //   if (window.pageYOffset) {
  //     yScroll = window.pageYOffset;
  //   } else if (document.documentElement && document.documentElement.scrollTop) {
  //     yScroll = document.documentElement.scrollTop;
  //   } else if (document.body) {
  //     yScroll = document.body.scrollTop;
  //   }
  //   return yScroll;
  // }

  /**
   * Onnstructor()
   */
  constructor() {
    this.cdkAutoScrollClass = 'in-transition';
  }

  /**
   * click event
   */
  @HostListener('click', ['$event', '$event.target'])
  public onClick(event: MouseEvent, target: HTMLElement): void {
    if (!Library.isNull(target)) {
      if (!Library.isNull(document)) {
        const id = target['hash'].substr(1);
        const element = document.getElementById(id);
        const targetOffset = element ? element.offsetTop : 0;
        // const currentPosition = this._getPageScroll();

        this.parent.scrollTop = targetOffset;
        // //
        // // Add Animation Class
        // //
        // this.parent.classList.add(this.cdkAutoScrollClass);
        // //
        // // Dynamically Calculate the Scrolling Transiton
        // //
        // this.parent.style['WebkitTransform'] = "translate(0, -" + (targetOffset - currentPosition) + "px)";
        // this.parent.style['MozTransform'] = "translate(0, -" + (targetOffset - currentPosition) + "px)";
        // this.parent.style.transform = "translate(0, -" + (targetOffset - currentPosition) + "px)";
        //
        // //
        // // After a period of time remove the class that enables the transitional scrolling
        // //
        // window.setTimeout(function () {
        //   this.parent.classList.remove(this.transitionClass);
        //   this.parent.style.cssText = "";
        //   window.scrollTo(0, targetOffset);
        // }, this.animateTime);

        event.preventDefault();
      }
    }
  }
}
