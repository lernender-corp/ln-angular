import {
  Component,
  Input,
  Output,
  TemplateRef,
  EventEmitter,
  ElementRef,
  ViewEncapsulation
} from '@angular/core';
//
// Library
//
import { Library, Guid, Action } from '@lernender/core';

@Component({
  moduleId: module.id,
  selector: 'ln-card',
  templateUrl: 'ln-card.html',
  styleUrls: ['ln-card.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LnCard {
  @Input() public uid: string | number;
  @Input() public animate: boolean;
  @Input() public hidden: boolean;
  @Input() public style: object;
  @Input() public header: TemplateRef<any>;
  @Input() public template: TemplateRef<any>;
  @Input() public actions: Action[];
  @Output() public onClick: EventEmitter<any> = new EventEmitter();

  public cid: string;
  public element: ElementRef;
  public el: any;

  constructor(_element: ElementRef) {
    this.element = _element;
    this.cid = Guid.NEW();
    this.uid = '';
    this.animate = true;
    this.hidden = false;
    this.style = {};
    this.actions = [];
  }

  //
  // onCard()
  //
  public onCard($event: MouseEvent) {
    $event.preventDefault();
    $event.stopPropagation();
    if (Library.isDefined(this.onClick)) {
      this.onClick.emit({
        event: $event,
        uid: this.uid
      });
    }
  }

  /**
   * onAction
   */
  public onAction($event: MouseEvent, action: Action) {
    $event.preventDefault();
    $event.stopPropagation();
    if (Library.isDefined(action)) {
      action.onClick({
        event: $event,
        uid: this.uid
      });
    }
  }

  public hasHeader() {
    return Library.isDefined(this.header);
  }
}
