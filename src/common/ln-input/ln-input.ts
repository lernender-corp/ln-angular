import {
  Component,
  forwardRef,
  Input,
  Output,
  EventEmitter,
  ViewEncapsulation,
  OnInit,
  ElementRef
} from '@angular/core';
import { Library, Guid } from '@lernender/core';
import {
  FormControl,
  ControlValueAccessor,
  Validator,
  NG_VALUE_ACCESSOR,
  NG_VALIDATORS
} from '@angular/forms';

@Component({
  moduleId: module.id,
  selector: 'ln-input',
  templateUrl: 'ln-input.html',
  styleUrls: ['ln-input.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => LnInput),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => LnInput),
      multi: true
    }
  ],
  encapsulation: ViewEncapsulation.None
})
export class LnInput implements ControlValueAccessor, Validator, OnInit {

  @Input()
  get value(): string {
    return this._value;
  }

  set value(v: string) {
    //
    // Make sure the string is not undefined
    // but rather is a value string value
    //
    if (Library.isString(v)) {
      if (v !== this._value) {
        this._value = v;
        this.onChange(v);
      }
    }
  }
  @Input() public hidden: boolean;
  @Input() public label: string;
  @Input() public prefix: string;
  @Input() public type: string;
  @Input() public name: string;
  @Input() public placeholder: string;
  @Input() public disabled: boolean;
  @Input() public pattern: string;
  @Input() public style: object;

  @Output() public valueChange: EventEmitter<string> = new EventEmitter();
  @Output() public onEnter: EventEmitter<any> = new EventEmitter();


  public uid: string;
  public fc: FormControl;

  private _value: string;

  constructor(protected _elementRef: ElementRef<HTMLInputElement>) {
    this.uid = Guid.CHAR();
    this.type = 'text';
    this.prefix = '';
    this.placeholder = '';
    this._value = '';
  }

  public clear() {
    //
    // Clear value
    //
    this._value = '';
  }

  /**
   * Updates view with form model
   */
  public writeValue(value: string) {
    if (Library.isString(value)) {
      this._value = value;
      this.onChange(this._value);
    }
  }

  public onChange = (_: any) => {

  }
  public onTouched = () => {

  }
  public registerOnChange(fn: (_: any) => void): void {
    this.onChange = fn;
  }
  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }


  public handleTab() {
    this.handleEnter();
  }

  public handleBlur() {
    this.handleEnter(true);
  }

  public handleEnter(onblur: boolean = false) {
    if (Library.isDefined(this.onEnter)) {
      this.onEnter.emit({
        value: this._value,
        onblur
      });
    }
  }

  public validate(c: FormControl) {
    this.fc = c;
    return null;
  }

  public ngOnInit() {}

  public ngOnChanges() {}

  public ngOnDestroy() {}

}
