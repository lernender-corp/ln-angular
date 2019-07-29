import {
  ViewEncapsulation,
  Component,
  Input,
  Output,
  HostListener,
  AfterViewInit,
  EventEmitter
} from '@angular/core';
//
// @Lernender
//
import { SlidePanel } from '@lernender/cdk/cdk-model';
import { Library } from '@lernender/core';
//
// Animations
//

@Component({
  moduleId: module.id,
  selector: 'ln-slide-panel',
  templateUrl: 'ln-slide-panel.html',
  styleUrls: ['ln-slide-panel.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class LnSlidePanel implements AfterViewInit {
  @Input() public panel: SlidePanel;
  @Output() public onChange: EventEmitter<any> = new EventEmitter();

  private _timeout: any;

  //
  // constructor()
  //
  constructor() {
    //
    // Allow Panel Overrides
    //
    this.panel = new SlidePanel();
  }
  //
  // HostListener()
  //
  @HostListener('window:resize')
  public onResize() {

    if (this._timeout) {
      clearTimeout(this._timeout);
    }

    this._timeout = setTimeout(
      (() => {

        if (Library.isDefined(this.onChange)) {
          this.onChange.emit();
        }

        this.panel.resize();

      }).bind(this),
      100
    );
  }
  //
  // handleToggle()
  //
  public handleToggle(panel: string) {
    switch (panel) {
      case 'leftBar':
      case 'leftPanel':
        this.panel.left.toggle();
        break;
      case 'rightBar':
      case 'rightPanel':
        this.panel.right.toggle();
        break;
    }

    if (Library.isDefined(this.onChange)) {
      this.onChange.emit();
    }

    this.panel.resize();
  }
  //
  // ngAfterViewInit()
  //
  public ngAfterViewInit() {
    if (Library.isDefined(this.onChange)) {
      this.onChange.emit();
    }
  }
}
