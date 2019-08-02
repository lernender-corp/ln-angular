import {
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
  ViewContainerRef,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from '@angular/core';
import { cloneDeep } from 'lodash-es';
import { Constant, Library, GridColumn, Message, Validate } from '@lernender/core';
import { LnDate } from '@lernender/common/ln-date';
import { LnInput } from '@lernender/common/ln-input';
import { LnText } from '@lernender/common/ln-text';
import { LnDropDown } from '@lernender/forms/ln-dropdown';
import { LnCheckBox } from '@lernender/forms/ln-checkbox';
import { Subscription, BehaviorSubject } from 'rxjs';

@Component({
  moduleId: module.id,
  selector: 'ln-grid-filter',
  templateUrl: 'ln-grid-filter.html',
  styleUrls: ['ln-grid-filter.css'],
  entryComponents: [LnDate, LnDropDown, LnText, LnInput],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LnGridFilter implements OnInit, OnChanges, OnDestroy {
  @Input() public column: GridColumn;
  @Input() public bus: BehaviorSubject<Message>;
  @Output() public onFilter: EventEmitter<any> = new EventEmitter();

  @ViewChild('idd', { read: ViewContainerRef, static: true }) public target: ViewContainerRef;

  private _componentRef: ComponentRef<any>;
  private _subscriptions: Subscription[];
  private _init: boolean = false;

  /**
   * constructor()
   */
  constructor(
    protected resolver: ComponentFactoryResolver,
    private _cdRef: ChangeDetectorRef
  ) {
    this._subscriptions = [];
  }

  //
  // ngOnDestroy()
  //
  public ngOnDestroy() {
    //
    // Destroy this reference
    //
    this.onDestroy();
  }

  //
  // ngOnInit()
  //
  public ngOnInit() {
    //
    // Set the initial State
    //
    this._init = true;
    //
    // Compose Component
    //
    this.composeComponent();
    //
    // If Subject pattern given subscribe to it...
    //
    if (Library.isDefined(this.bus)) {
      this._subscriptions.push(
        this.bus.asObservable().subscribe((message: Message) => {
          if (Library.isObject(this._componentRef.instance)) {
            if (message) {
              switch (message.type) {
                case 'CLEAR':
                  if (this._componentRef.instance instanceof LnInput) {
                    //
                    // Clear LnInput
                    //
                    this._componentRef.instance.clear();
                  } else if (
                    this._componentRef.instance instanceof LnDropDown
                  ) {
                    //
                    // Clear the DropDown
                    //
                    this._componentRef.instance.clear(false);
                  } else if (
                    this._componentRef.instance instanceof LnCheckBox
                  ) {
                    //
                    // SDL: Someone needs to add clear funcitonality to dropdown (i.e. this._componentRef.instance.clear()).
                    //
                  }
                  break;
              }
              //
              // Detect changes
              //
              this._cdRef.detectChanges();
            }
          }
        })
      );
    }
  }

  //
  // ngOnChanges()
  //
  public ngOnChanges(): void {
    this.composeComponent();
  }

  //
  // onDestroy()
  //
  private onDestroy() {
    //
    // If we created a dynamic component then destroy it.
    //
    if (this._componentRef) {
      this._componentRef.destroy();
    }
    //
    // If _subscriptions unsubscribe from all...
    //
    if (Library.isArrayWithLength(this._subscriptions)) {
      for (const subscription of this._subscriptions) {
        subscription.unsubscribe();
      }
    }
  }

  //
  // getComponent()
  //
  private getComponent(component: string): any {
    switch (component) {
      case 'LnDate':
        return LnDate;
      case 'LnDropDown':
        return LnDropDown;
      default:
        return LnInput;
    }
  }

  /**
   */
  private composeComponent() {
    if (!this._init) {
      return;
    }

    //
    // Destroy existing component reference
    //
    this.onDestroy();

    if (Library.isObject(this.column)) {
      //
      // Load the component
      //
      const componentFactory = this.resolver.resolveComponentFactory(
        this.getComponent(this.column.filterComponent.type)
      );
      //
      // Component Reference
      //
      this._componentRef = this.target.createComponent(componentFactory);
      //
      // Adorn the component with information
      //
      if (Library.isObject(this._componentRef.instance)) {
        //
        // Switch on Column Type
        //
        switch (this.column.filterComponent.type) {
          case 'LnCheckBox':
            //
            // Nothing to bind for the checkbox column
            //
            this._componentRef.instance.style = cloneDeep(this.column.style);
            this._componentRef.instance.checked = this.column.checked;
            this._componentRef.instance.disabled = this.column.disabled;
            break;
          case 'LnDropDown':
            //
            // If the column definition has options then we need to pass those options to the
            // LnGridFilter / default component
            //
            if (this.column.filterComponent.hasItems()) {
              this._componentRef.instance.checkAllFieldValue = this.column.filterComponent.checkAllFieldValue;
              this._componentRef.instance.dataTextField = this.column.filterComponent.dataTextField;
              this._componentRef.instance.dataValueField = this.column.filterComponent.dataValueField;
              this._componentRef.instance.disabled = this.column.filterComponent.disabled;
              this._componentRef.instance.hidden = this.column.filterComponent.hidden;
              this._componentRef.instance.hover = this.column.filterComponent.hover;
              this._componentRef.instance.multiple = this.column.filterComponent.multiple;
              this._componentRef.instance.placeholder = this.column.filterComponent.placeholder;
              this._componentRef.instance.indicatorIcon = this.column.filterComponent.indicatorIcon;
              this._componentRef.instance.style = this.column.filterComponent.style;
              this._componentRef.instance.default = this.column.filterComponent.default;
              //
              // Initial Data
              //
              if (this.column.filterComponent.hasItems()) {
                this._componentRef.instance.items = this.column.filterComponent.items;
              }
              //
              // onValueChange()
              //
              this._subscriptions.push(
                this._componentRef.instance.onValueChange.subscribe(
                  (resp: any) => {
                    let items: any[] = [];
                    if (!Library.isNullOrUndefined(resp)) {
                      if (!Library.isArray(resp)) {
                        items.push(resp);
                      } else {
                        items = resp;
                      }

                      if (items.length > 0) {
                        items = items.map(
                          (el: any) =>
                            el[this.column.filterComponent.dataValueField]
                        );
                      }
                    }
                    this.column.onFilter(items, this.column);
                  }
                )
              );
            }
            break;
          default:
            //
            // If the field has an object Field reference then extract the value
            //
            this._componentRef.instance.align = this.column.align;
            this._componentRef.instance.placeholder = this.column.placeholder;
            this._componentRef.instance.disabled =
              this.column.disabled || !this.column.filter.enabled;
            this._componentRef.instance.style = { ...this.column.style };
            this._componentRef.instance.name = 'grid';
            this._subscriptions.push(
              this._componentRef.instance.onEnter.subscribe((obj: any) => {
                let value = obj['value'];
                //
                // Accomidate Special Characters used in Filters
                //
                if (Library.isStringWithLength(value)) {
                  if (
                    Validate.hasComparisonOperator(value) ||
                    Validate.hasInverseOperator(value)
                  ) {
                    value = Library.replace(value, /([-|<|>|=])/g, '$1 ');
                  }
                }
                //
                // Designate the FilterType
                //
                this.column.filter.type |= Constant.FILTER_TYPE_INTERNAL;
                //
                // Filter
                //
                this.column.onFilter(value, this.column);
              })
            );
            break;
        }
      }
    }
  }
}
