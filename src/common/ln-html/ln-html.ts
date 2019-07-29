import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  ViewEncapsulation
} from '@angular/core';
import { Library } from '@lernender/core';

@Component({
  moduleId: module.id,
  selector: 'ln-html',
  templateUrl: 'ln-html.html',
  styleUrls: ['ln-html.css'],
  encapsulation: ViewEncapsulation.None
})
export class LnHtml implements OnInit {
  @Input() public disabled: boolean;
  @Input() public hidden: boolean;
  @Input() public value: string;
  @Output() public onClick: EventEmitter<any> = new EventEmitter();

  //
  // handleOnClick()
  //
  public handleOnClick($event: MouseEvent) {
    if (Library.isDefined(this.onClick)) {
      this.onClick.emit($event);
    }
  }
  /**
   * ngOnInit
   */
  public ngOnInit() {
    //
    // Allow the user to override the default icon.
    //
    this.value = this.value || '';
  }
}
