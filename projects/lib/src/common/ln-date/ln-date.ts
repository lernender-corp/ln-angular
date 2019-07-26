import {
  Component,
  Input,
  ViewEncapsulation,
  Output,
  EventEmitter,
  OnInit
} from '@angular/core';
import { Library } from '@lernender/core';
import { DateFormat } from '../../cdk/cdk-library/cdk-constant';

@Component({
  moduleId: module.id,
  selector: 'ln-date',
  templateUrl: 'ln-date.html',
  styleUrls: ['ln-date.scss'],
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
    this.pattern = DateFormat.USStandard;
  }

  ngOnInit() {
    // Protect pattern from undefined/empty string input
    if (!this.pattern) {
      this.pattern = DateFormat.USStandard;
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
