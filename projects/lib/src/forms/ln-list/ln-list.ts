import {
  Component,
  OnInit,
  OnChanges,
  AfterContentInit,
  SimpleChange,
  ViewEncapsulation,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import { Response, Library } from '@lernender/core';
import { CdkBase } from '../../cdk';

@Component({
  moduleId: module.id,
  selector: 'ln-list',
  templateUrl: './ln-list.html',
  styleUrls: ['ln-list.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LnList extends CdkBase
  implements AfterContentInit, OnChanges, OnInit {
  //
  // List of items
  //
  @Input() public data: any;
  @Output() public onClick: EventEmitter<any> = new EventEmitter<any>();

  constructor() {
    super();
  }

  public textAlign(item: any) {
    if (Library.isDefined(item.ref)) {
      if (Library.hasOwnProperty(item.ref, 'text-align')) {
        if (Library.isStringWithLength(item.ref['text-align'])) {
          return item.ref['text-align'];
        }
      }
    }

    return 'right';
  }

  public ngAfterContentInit() {}

  public ngOnInit() {
    this.style = {...this.style};
  }
  //
  // ngOnChanges
  //
  public ngOnChanges(changes: { [propName: string]: SimpleChange }) {
    //
    // Initialize Component
    //
    if (Library.isDefined(changes['dataEventHandler'])) {
      if (Library.isDefined(changes['dataEventHandler'].currentValue)) {
        /**
         * Register Data Event Listener
         */
        this.registerDataEventHandler((resp: Response) => {
          if (resp.hasData()) {
            this.data = resp.data;
          }
        });
      }
    }
  }

  public handleOnClickEvent(event: MouseEvent, item: any) {
    this.onClick.emit({event: event, item: item});
  }
}
