import {
  Component,
  ContentChildren,
  EventEmitter,
  Input,
  OnInit,
  QueryList,
  OnDestroy
} from '@angular/core';
import { Library } from '@lernender/core';
import { LnAccordion } from '@lernender/forms/ln-accordion';
import { Subscription } from 'rxjs';

@Component({
  moduleId: module.id,
  selector: 'ln-accordion-panel',
  templateUrl: 'ln-accordion-panel.html',
  styleUrls: ['ln-accordion-panel.css']
})
export class LnAccordionPanel
  implements OnInit, OnDestroy {
  @Input() public mode: string;
  @Input() public disabled: boolean;
  @Input() public hidden: boolean;
  @Input() public style: object;
  @Input() public checked: boolean;

  @ContentChildren(LnAccordion) public items: QueryList<LnAccordion>;

  private _subscription: Subscription;

  //
  // Private Variable
  //
  private _handleClick: EventEmitter<any> = new EventEmitter<any>();

  constructor() {
    this.mode = 'multi';
    this.disabled = false;
    this.hidden = false;
    this.checked = false;
    this.style = {};
  }

  //
  // ngOnInit()
  //
  public ngOnInit() {
    //
    // Listen in on changed events
    //
    this._subscription = this._handleClick.subscribe((item: any) => {
      if (Library.isDefined(item)) {
        if (this.mode.toLocaleLowerCase() === 'single') {
          this.items.forEach(i => {
            if (i.id !== item.id) {
              i.active = false;
            }
          });
        }
      }
    });
  }
  //
  // ngOnDestroy()
  //
  public ngOnDestroy() {
    if (Library.isDefined(this._subscription)) {
      this._subscription.unsubscribe();
    }
  }
}
