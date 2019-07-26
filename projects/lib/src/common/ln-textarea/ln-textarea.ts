import {
  Component,
  EventEmitter,
  forwardRef,
  Input,
  Output
} from '@angular/core';
import { ControlValueAccessor, Validator, FormControl, NG_VALUE_ACCESSOR, NG_VALIDATORS } from '@angular/forms';
import { Library, Guid } from '@lernender/core';

@Component({
  moduleId: module.id,
  selector: 'ln-textarea',
  templateUrl: 'ln-textarea.html',
  styleUrls: ['ln-textarea.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => LnTextArea),
      multi: true
    },
    {

      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => LnTextArea),
      multi: true
    }
  ]
})
export class LnTextArea implements ControlValueAccessor, Validator {
  @Input() public cols: number;
  @Input() public disabled: boolean;
  @Input() public hidden: boolean;
  @Input() public label: string;
  @Input() public description: string;
  @Input() public maxlength: number;
  @Input() public minlength: number;
  @Input() public placeholder: string;
  @Input() public rows: number;
  @Input() public style: object;
  @Input() public cancelEventPropagation: boolean;
  @Input() public tooltip: string;
  @Input()
  get value(): string {
    return this._value;
  }

  set value(val: string) {
    if (Library.isString(val)) {
      if (val !== this._value) {
        this._value = val;
        this.onChange(val);
        this.onTouched();
        if (Library.isDefined(this.onValueChange)) {
          this.onValueChange.emit(this._value);
        }
      }
    }
  }
  @Output() public onValueChange: EventEmitter<string> = new EventEmitter();

  //
  // Public Variables
  //
  public uid: string;
  public fc: FormControl;
  //
  // Private Variables
  //
  private _value: string;

  //
  // constructor()
  //
  constructor() {
    this._value = '';
    this.cancelEventPropagation = false;
    this.cols = 10;
    this.disabled = false;
    this.hidden = false;
    this.label = '';
    this.maxlength = 255;
    this.minlength = 0;
    this.placeholder = '';
    this.rows = 1;
    this.style = {};
    this.uid = Guid.NEW();
  }

  public hasLabel() {
    return Library.isStringWithLength(this.label);
  }

  public writeValue(value: string): void {
    if (Library.isString(value)) {
      this._value = value;
      this.onChange(this._value);
    }
  }

  public registerOnChange(fn: any) {
    this.propagateChange = fn;
  }

  public onChange(value: string) {
    this.propagateChange(value);
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  //
  // validate()
  //
  public validate(c: FormControl) {
    //  SDL not sure about this,
    //  looking into a better solution....
    this.fc = c;
    return null;
  }

  public handleOnClick($event: MouseEvent): void {
    if (this.cancelEventPropagation) {
      $event.preventDefault();
      $event.stopPropagation();
    }
  }

  private propagateChange = (_: any) => { };
  private onTouched = () => { };
}
