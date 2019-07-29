import {
  Component,
  Input,
  ViewEncapsulation,
  Output,
  EventEmitter,
  OnInit
} from '@angular/core';
import { Library } from '@lernender/core';

@Component({
  moduleId: module.id,
  selector: 'ln-date',
  templateUrl: 'ln-date.html',
  styleUrls: ['ln-date.css'],
  encapsulation: ViewEncapsulation.None
})
export class LnDate implements OnInit {
  @Input() public disabled: boolean;
  @Input() public hidden: boolean;
  @Input() public pattern: string;
  @Input() public value: Date;
  @Output() public onClick: EventEmitter<any> = new EventEmitter();
  /**
   * Constructor()
   */
  constructor() {
    this.pattern = 'US';
  }

  public ngOnInit() {
    // Protect pattern from undefined/empty string input
    if (!this.pattern) {
      this.pattern = 'US';
    }
  }

  //
  // handleOnClick()
  //
  public handleOnClick($event: MouseEvent) {
    if (Library.isDefined(this.onClick)) {
      this.onClick.emit($event);
    }
  }
}
