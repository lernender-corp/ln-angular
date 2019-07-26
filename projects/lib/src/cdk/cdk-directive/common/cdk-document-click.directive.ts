import {
  Directive,
  ElementRef,
  Output,
  EventEmitter,
  HostListener
} from '@angular/core';

@Directive({
  selector: '[cdkDocumentClick]'
})
export class CdkDocumentClickDirective {
  @Output()
  public cdkDocumentClick = new EventEmitter<[MouseEvent, HTMLElement]>();

  constructor(private _elementRef: ElementRef) {}

  @HostListener('document:click', ['$event', '$event.target'])
  public onClick(event: MouseEvent, targetElement: HTMLElement): void {
    if (!targetElement) {
      return;
    }

    const clickedOutisde = this._elementRef.nativeElement.contains(
      targetElement
    );
    if (!clickedOutisde) {
      this.cdkDocumentClick.emit([event, targetElement]);
    }
  }
}
