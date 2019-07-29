import {
  Directive,
  OnDestroy,
  Input,
  Output,
  AfterViewInit,
  EventEmitter
} from '@angular/core';

@Directive({
  selector: '[cdkReady]'
})
export class CdkReadyDirective implements AfterViewInit, OnDestroy {
  @Input('cdkReadyCondition') set condition(value: boolean) {
    if (value) {
      if (this.onReady) {
        this.onReady.emit(value);
      }
    }
  }
  @Output() public onReady: EventEmitter<boolean> = new EventEmitter();

  constructor() {}

  public ngAfterViewInit(): void {}

  public ngOnDestroy(): void {}
}
