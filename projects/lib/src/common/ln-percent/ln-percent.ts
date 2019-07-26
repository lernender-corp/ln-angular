import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewEncapsulation
} from '@angular/core';
import { Library } from '@lernender/core';

@Component({
  moduleId: module.id,
  selector: 'ln-percent',
  templateUrl: 'ln-percent.html',
  styleUrls: ['ln-percent.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LnPercent {
  @Input() public disabled: boolean;
  @Input() public hidden: boolean;
  @Input() public style: object;
  @Input() public value: number;
  @Input() public align: string;
  @Input() public pattern: string;
  @Output() public onClick: EventEmitter<MouseEvent> = new EventEmitter();

  constructor() {
    this.value = 0;
    this.align = 'left';
    this.pattern = '3.2-2';
    this.disabled = false;
    this.hidden = false;
    this.style = {};
  }

  /**
   * hasPattern()
   */
  public hasPattern() {
    return Library.isStringWithLength(this.pattern);
  }

  public handleOnClick($event: MouseEvent) {
    if (Library.isDefined(this.onClick)) {
      this.onClick.emit($event);
    }
  }
}
