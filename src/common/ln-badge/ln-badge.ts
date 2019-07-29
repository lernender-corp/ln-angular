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
  selector: 'ln-badge',
  templateUrl: 'ln-badge.html',
  styleUrls: ['ln-badge.css'],
  encapsulation: ViewEncapsulation.None
})
export class LnBadge {
  @Input() public disabled: boolean;
  @Input() public hidden: boolean;
  @Input() public label: string;
  @Input() public value: number;
  @Output() public onClick: EventEmitter<number> = new EventEmitter();

  constructor() {
    this.label = '';
    this.value = 0;
  }

  public handleClick() {
    if (Library.isDefined(this.onClick)) {
      this.onClick.emit(this.value);
    }
  }
}
