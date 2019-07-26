import {
  Component,
  ComponentFactoryResolver,
  Input,
  ViewChild,
  Output,
  EventEmitter,
  ViewEncapsulation,
  OnInit,
  OnDestroy
} from '@angular/core';
//
// Library
//
import { Library, Guid, Action } from '@lernender/core';
//
// Directives
//
import { CdkAnchorDirective } from '../../cdk';

//
// Dynamic Card Components
//

@Component({
  moduleId: module.id,
  selector: 'ln-dynamic-card',
  templateUrl: 'ln-dynamic-card.html',
  styleUrls: ['ln-dynamic-card.scss'],
  encapsulation: ViewEncapsulation.None,
  entryComponents: []
})
export class LnDynamicCard implements OnInit, OnDestroy {
  @Input() public data: any;
  @Input() public hidden: boolean;
  @Input() public disabled: boolean;
  @Input() public actions: Action[];
  @Output() public onClick: EventEmitter<any> = new EventEmitter();
  //
  // View Children
  //
  @ViewChild(CdkAnchorDirective, { static: true }) public anchor: CdkAnchorDirective;
  public cid: string;

  private _componentRef: any;
  /**
   * constructor()
   */
  constructor(private _componentFactoryResolver: ComponentFactoryResolver) {
    this.cid = Guid.NEW();
    this.actions = [];
    this.data = {};
    this.hidden = false;
    this.disabled = false;
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
        cid: this.cid
      });
    }
  }

  public ngOnInit() {
    //
    // If the card type is defined
    //
    if (Library.isObject(this.data)) {
      //
      // Dynamically Create an Instance of a Component of Type<T>
      //
      this._componentRef = this.anchor.view.createComponent<any>(
        this._componentFactoryResolver.resolveComponentFactory(this.data.type)
      );
      //
      // Assign Data to ComponentRef Instance
      // multi select dropdown
      //
      if (Library.isDefined(this._componentRef)) {
        this._componentRef.instance['data'] = this.data;
      }
    }
  }

  //
  // ngOnDestroy()
  //
  public ngOnDestroy() {
    this._destroy();
  }
  //
  // _destroy()
  //
  private _destroy() {
    if (this._componentRef) {
      this._componentRef.destroy();
    }
    this._componentRef = null;
  }
}
