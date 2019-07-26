import { Library } from '@lernender/core';
import { Pane } from './pane';

export class Panel {
  public bar: Pane;
  public panel: Pane;

  constructor();
  constructor(options: object);
  constructor(options?: any) {
    this.bar = new Pane(Library.init(options, 'bar', {}));
    this.panel = new Pane(Library.init(options, 'panel', {}));
  }

  public getBoundingClientRect() {
    return {
      bar: this.bar.getBoundingClientRect(),
      panel: this.panel.getBoundingClientRect()
    };
  }

  public toggle() {
    if (this.bar.isOpen()) {
      this.bar.toggle();
      if (this.bar.hasOnClick()) {
        this.bar.onClick(this);
      }
      this.panel.open = true;
    } else if (this.panel.isOpen()) {
      this.panel.toggle();
      if (this.panel.hasOnClick()) {
        this.panel.onClick(this);
      }
      this.bar.open = true;
    }
  }
}
