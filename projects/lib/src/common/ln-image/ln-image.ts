import {
  Component,
  Input,
  ViewEncapsulation,
  OnInit,
  EventEmitter,
  Output
} from '@angular/core';
import { Library } from '@lernender/core';

@Component({
  moduleId: module.id,
  selector: 'ln-image',
  templateUrl: 'ln-image.html',
  styleUrls: ['ln-image.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LnImage implements OnInit {
  @Input() public disabled: boolean;
  @Input() public hidden: boolean;
  @Input() public style: object;
  @Input() public src: string;
  @Input() public alt: string;
  @Output() public onClick: EventEmitter<any> = new EventEmitter();

  /**
   * Constructor
   */
  constructor() {
    this.style = {};
    this.alt = '';
  }
  /**
   * Event: onInit().
   */
  public ngOnInit() {
    //
    // Initialize Options
    //
    this.style = {...this.style};
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
