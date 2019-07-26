import {
  Component,
  Input,
  OnChanges,
  ViewEncapsulation,
  OnInit,
  SimpleChanges,
  forwardRef
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CdkBase } from '../../cdk';
import { Library, Response } from '@lernender/core';

@Component({
  moduleId: module.id,
  selector: 'ln-radio-button',
  templateUrl: 'ln-radio-button.html',
  styleUrls: ['ln-radio-button.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => LnRadioButton),
      multi: true
    }
  ],
  encapsulation: ViewEncapsulation.None
})
export class LnRadioButton extends CdkBase
  implements ControlValueAccessor, OnChanges, OnInit {

  @Input()
  get value(): any {
    return this._value;
  }

  set value(v: any) {
    if (Library.isDefined(v)) {
      if (v !== this._value) {
        this._value = v;
        this.onChange(v);
      }
    }
  }
  @Input() public disabled: boolean;
  @Input() public hidden: boolean;
  @Input() public label: string;
  @Input() public dataTextField: string;
  @Input() public dataValueField: string;

  public items: any[];

  private _value: any;

  constructor() {
    super();
    this.label = '';
    this.dataTextField = 'name';
    this.dataValueField = 'id';
  }
  public writeValue(value: any) {
    if (Library.isDefined(value)) {
      this._value = value;
      this.onChange(this._value);
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

  /**
   * ngOnInit()
   */
  public ngOnInit() {}

  public ngOnChanges(changes: SimpleChanges) {
    if (Library.isDefined(changes['dataEventHandler'])) {
      if (Library.isDefined(changes['dataEventHandler'].currentValue)) {
        /**
         * Register Data Event Listener
         */
        this.registerDataEventHandler((resp: Response) => {
          if (resp.hasData()) {
            this.items = resp.data;
          }
        });
      }
    }
  }
}
