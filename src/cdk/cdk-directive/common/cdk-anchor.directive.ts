import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[cdkAnchor]'
})
export class CdkAnchorDirective {
  //
  // view()
  //
  public get view(): ViewContainerRef {
    return this._view;
  }
  constructor(public _view: ViewContainerRef) {}
}
