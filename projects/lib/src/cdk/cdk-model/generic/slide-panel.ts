import { Library } from '@lernender/core';
import { Panel } from './panel';
import { Pane } from './pane';
import { EventEmitter } from '@angular/core';

export interface ISlidePanel {
  left: Panel;
  center: Pane;
  right: Panel;
  onWidthChanged: EventEmitter<void>;

  resize(): void;
  setCenterPanelWidth(o?: Pane): void;
}

export class SlidePanel implements ISlidePanel {
  public left: Panel;
  public center: Pane;
  public right: Panel;
  public onWidthChanged: EventEmitter<void> = new EventEmitter<void>();

  constructor();
  constructor(left: object);
  constructor(left: object, right: object);
  constructor(left: object, right: object, center: object);
  constructor(left?: any, right?: any, center?: any) {
    this.left = new Panel(left || {});
    this.left.bar.type = 'leftBar';
    this.left.panel.type = 'leftPanel';

    this.center = new Pane(center || { open: true });

    this.right = new Panel(right || {});
    this.right.bar.type = 'rightBar';
    this.right.panel.type = 'rightPanel';
  }

  //
  // Resize
  //
  public resize(wait: number = 50) {
    setTimeout(() => {
      this.setCenterPanelWidth();
      this.onWidthChanged.emit();
    }, wait);
  }

  //
  // setCenterPanelWidth()
  //
// tslint:disable-next-line: no-unnecessary-initializer
  public setCenterPanelWidth(o: Pane = undefined) {
    const bodyWidth = document.body.getBoundingClientRect().width; // ? this is not right...

    this.left.getBoundingClientRect();
    this.right.getBoundingClientRect();

    const lWidth = this.left.bar.isOpen()
      ? this.left.bar.width
      : this.left.panel.width;

    const rWidth = this.right.bar.isOpen()
      ? this.right.bar.width
      : this.right.panel.width;

    const width = (bodyWidth as number) - lWidth - rWidth;

    if (!Library.isDefined(o)) {
      this.center.style = { ...this.center.style, width: `${width}px` };
    } else {
      switch (o.type) {
        case 'leftBar':
        case 'leftPanel':
          this.center.style = {
            ...this.center.style,
            marginLeft: o.width,
            width: `${width}px`
          };
          break;
        case 'rightBar':
        case 'rightPanel':
          this.center.style = {
            ...this.center.style,
            marginRight: o.width,
            width: `${width}px`
          };
          break;
      }
    }
  }
}
