import {
  Component,
  Input,
  ViewEncapsulation,
  Output,
  EventEmitter,
  OnInit,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { Library } from '@lernender/core';

@Component({
  moduleId: module.id,
  selector: 'ln-number',
  templateUrl: 'ln-number.html',
  styleUrls: ['ln-number.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LnNumber implements OnInit, OnChanges {
  @Input() public align: string;
  @Input() public disabled: boolean;
  @Input() public hidden: boolean;
  @Input() public pattern: string;
  @Input() public placeholder: string;
  @Input() public style: object;
  @Input() public value?: number;
  @Output() public onClick: EventEmitter<MouseEvent> = new EventEmitter();

  public isNumber: boolean;

  constructor() {
    this.align = 'right';
    this.disabled = false;
    this.hidden = false;
    this.isNumber = true;
    this.pattern = '2.2-3';
    this.placeholder = '-';
    this.style = {};
  }

  public ngOnInit() {
    this.isNumber = typeof this.value === 'number';
  }

  public ngOnChanges(changes: SimpleChanges) {
    if (
      changes &&
      changes.value &&
      Library.hasOwnProperty(changes.value, 'currentValue')
      ) {
      this.isNumber = typeof this.value === 'number';
    }
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

  public canFormat() {
    return Library.isNumber(this.value);
  }
}
