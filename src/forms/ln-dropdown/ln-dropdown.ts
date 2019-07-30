import {
  Component,
  EventEmitter,
  forwardRef,
  Input,
  OnDestroy,
  SimpleChanges,
  OnChanges,
  OnInit,
  Output,
  ViewEncapsulation
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Response, Library, Icon } from '@lernender/core';
import { CdkBase } from '@lernender/cdk/cdk-base';

@Component({
  moduleId: module.id,
  selector: 'ln-dropdown',
  templateUrl: './ln-dropdown.html',
  styleUrls: ['ln-dropdown.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => LnDropDown),
      multi: true
    }
  ],
  encapsulation: ViewEncapsulation.None
})
export class LnDropDown extends CdkBase
  implements ControlValueAccessor, OnInit, OnChanges, OnDestroy {
  @Input()
  get value(): any | any[] {
    return this._value;
  }
  set value(v: any | any[]) {
    if (Library.isDefined(v)) {
      if (v !== this._value) {
        this._value = v;
        this.onChange(v);
        // if (Library.isDefined(this.onClick)) {
        //   this.onClick.emit(this._value);
        // }
      }
    }
  }
  @Input() public disabled: boolean;
  @Input() public hidden: boolean;
  @Input() public label: string;
  @Input() public multiple: boolean;
  @Input() public tooltip: boolean;
  @Input() public placeholder: string;
  @Input() public indicatorIcon: string;
  @Input() public hover: boolean = false;
  @Input() public dataTextField: string = 'name';
  @Input() public dataValueField: string = 'id';
  @Input() public checkAllFieldValue: string = 'All';
  @Input() public style: any;
  @Output() public onValueChange: EventEmitter<any> = new EventEmitter<any>();
  @Output() public onClose: EventEmitter<any> = new EventEmitter<any>();

  /**
   * Public Variables
   */
  public items: any[];
  public input: any;
  public icon: Icon;
  public open: boolean;
  public selectedIndicatorIcon: Icon;
  public displayItem: any;

  /**
   * Private Variables
   */
  private _value: any | any[];
  private _emitOnChange: boolean;

  constructor() {
    super();
    this.open = false;
    this.label = '';
    this.placeholder = '';
    this.items = [];
    this.multiple = false;
    this.selectedIndicatorIcon = new Icon({
      name: 'checkmark'
    });
    this.style = {};
    this.displayItem = null;
    this._emitOnChange = true;
  }

  public writeValue(value: any) {
    if (Library.isDefined(value)) {
      this._value = value;
      //
      // If we are to emit change event the do so...
      //
      if (this._emitOnChange) {
        this.onChange(this._value);
      }
      //
      // Reset to default state (i.e. emit onChange())
      //
      this._emitOnChange = true;
    }
  }

  public onChange = (_: any) => {};
  public onTouched = () => {};
  public registerOnChange(fn: (_: any) => void): void {
    this.onChange = fn;
  }
  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
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

  // public selectedName() {
  //   if(this.multiple) {
  //     const name = this.items.filter(i => i[this.dataValueField] !==
  //      this.checkAllFieldValue && i.checked).map(e => e[this.dataTextField]).join(', ')
  //     return  {name};
  //   } else {
  //     return this.value;
  //   }
  // }

  // public canDisplay() {
  //   return (
  //     (
  //       (this.multiple && Library.isArrayWithLength(this.value))
  //       || (!this.multiple && !Library.isNullOrUndefined(this.value)
  //       && !Library.isNullOrUndefined(this.value[this.dataValueField])
  //       &&  Library.isStringWithLength(this.value[this.dataValueField]))
  //     )
  //     ||
  //     !this.hover
  //   );
  // }
  //
  // handleDocumentClick()
  // $event: MouseEvent, element: HTMLElement
  public handleDocumentClick() {
    this.open = false;
  }
  //
  // Handle Click
  //
  public _handleOnClick(item: any) {
    if (item.disabled) {
      return;
    }
    if (this.multiple) {
      item.checked = item.checked ? false : true;
      if (item[this.dataValueField] === this.checkAllFieldValue) {
        this.items
          .filter(i => !i.disabled && i[this.dataValueField] !== null)
          .map(i => (i.checked = item.checked));
      } else {
        const idx = this.items.findIndex(
          i => i[this.dataValueField] === this.checkAllFieldValue
        );
        if (idx > -1) {
          const len = this.items.filter(
            i => i.checked !== item.checked && i[this.dataValueField] !== this.checkAllFieldValue
            && i[this.dataValueField] !== null
          ).length;
          this.items[idx].checked = len === 0 ? item.checked : false;
        }
      }
      this.value = this.items.filter(i => !i.disabled && i.checked);
      const name = this.items
        .filter(
          i => i[this.dataValueField] !== this.checkAllFieldValue && i.checked && i[this.dataValueField] !== null
        )
        .map(e => e[this.dataTextField])
        .join(', ');
      this.displayItem = { name };
    } else {
      this.displayItem = item;
      this.value = item;
    }
    //
    // Toggle open/close
    //
    if (Library.isDefined(item.onClick)) {
      item.onClick(item);
    }

    if (this._emitOnChange) {
      if (Library.isDefined(this.onValueChange)) {
        this.onValueChange.emit(this.value);
      }
    }

    if (!this.multiple) {
      this.toggle();
    }
  }
  //
  // ngOnChanges()
  //
  public ngOnChanges(changes: SimpleChanges) {
    if (Library.isDefined(changes['dataEventHandler'])) {
      if (Library.isDefined(changes['dataEventHandler'].currentValue)) {
        /**
         * Register Data Event Listener
         */
        this.registerDataEventHandler((resp: Response) => {
          if (resp.hasData()) {
            setTimeout(() => {
              this.items = resp.data;

              this._value = this.multiple
                ? resp.data.filter(c => !c.disabled && c.checked === true)
                : resp.data.filter(c => !c.disabled && c.checked === true).length > 0
                ? resp.data.filter(c => !c.disabled && c.checked === true)[0]
                : undefined;
              if (this.multiple) {
                const name = this.items
                  .filter(
                    i =>
                      i[this.dataValueField] !== this.checkAllFieldValue
                      && i[this.dataValueField] !== null
                      && i.checked
                  )
                  .map(e => e[this.dataTextField])
                  .join(', ');
                this.displayItem = { name };
              } else {
                this.displayItem = this._value;
              }
            }, 10);
          }
        });
      }
    }
    if (Library.isDefined(changes['items'])) {
      if (Library.isDefined(changes['items'].currentValue)) {

      }
    }
  }

  public ngOnInit() {
    //
    // Inut Controls
    //
    this.icon = new Icon({
      name: 'arrow-half-dwn',
      onClick: ($event: MouseEvent) => {
        $event.preventDefault();
        $event.stopPropagation();
        this.toggle();
      }
    });
    if (!Library.isNullOrUndefined(this.indicatorIcon)) {
      this.selectedIndicatorIcon = new Icon({
        name: this.indicatorIcon
      });
    }
  }

  public ngOnDestroy() {}

  //
  // _toggle()
  //
  public toggle() {
    this.open = !this.open;
    this.icon.name = this.open ? 'arrow-half-up' : 'arrow-half-dwn';
  }

  public close() {
    const isCurrentlyOpen = this.open;
    this.open = false;
    this.icon.name = this.open ? 'arrow-half-up' : 'arrow-half-dwn';
    this.onClose.emit(isCurrentlyOpen);
  }

  public clear(emitChangeEvent: boolean = true) {
    //
    //  Programatically emit onChange() Event
    //
    this._emitOnChange = emitChangeEvent;

    if (this.multiple) {
      this.items.map(i => i.checked = false);
      this.displayItem = { name: '' };
      this.value = [];
    } else {
      this.displayItem = undefined;
      this._value = undefined;
    }

    if (Library.isDefined(this.onValueChange)) {
      if (emitChangeEvent) {
        this.onValueChange.emit(this.value);
      }
    }
  }
}
