import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation
} from '@angular/core';
import { Element, Library } from '@lernender/core';

@Component({
  moduleId: module.id,
  selector: 'ln-hyperlink',
  templateUrl: 'ln-hyperlink.html',
  styleUrls: ['ln-hyperlink.css'],
  encapsulation: ViewEncapsulation.None
})
export class LnHyperLink {
  @Input() public active: boolean;
  @Input() public disabled: boolean;
  @Input() public hidden: boolean;
  @Input() public value: Element;
  @Input() public uppercase: boolean;
  @Output() public onClick: EventEmitter<any> = new EventEmitter();

  /**
   * Constructor()
   */
  constructor() {
    this.value = new Element();
    this.uppercase = false;
  }
  /**
   * handleClick()
   */
  public handleClick($event: any) {
    if (Library.isDefined(this.onClick)) {
      this.onClick.emit($event);
    }
  }
}
