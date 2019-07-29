import {
  Component,
  Input,
  ViewEncapsulation,
  Output,
  EventEmitter
} from '@angular/core';
import { Library } from '@lernender/core';

@Component({
  moduleId: module.id,
  selector: 'ln-currency',
  templateUrl: 'ln-currency.html',
  styleUrls: ['ln-currency.css'],
  encapsulation: ViewEncapsulation.None
})
export class LnCurrency {
  @Input() public disabled: boolean;
  @Input() public hidden: boolean;
  @Input() public style: object;
  @Input() public align: string;
  @Input() public value: number;
  @Input() public pattern: string;
  @Output() public onClick: EventEmitter<MouseEvent> = new EventEmitter();

  constructor() {
    this.pattern = 'USD';
    this.align = 'left';
    this.value = 0;
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
  /**
   * handleOnClick()
   */
  public handleOnClick($event: MouseEvent) {
    if (Library.isDefined(this.onClick)) {
      this.onClick.emit($event);
    }
  }
}
