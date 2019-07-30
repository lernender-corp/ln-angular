import {
  Component,
  EventEmitter,
  forwardRef,
  Input,
  Output,
  ViewEncapsulation
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Library, Constant } from '@lernender/core';

enum CheckboxIconName {
  SELECTED = 'checkbox-selected',
  UNSELECTED = 'checkbox',
  DESELECT = 'checkbox-deselect'
}

@Component({
  moduleId: module.id,
  selector: 'ln-checkbox',
  templateUrl: 'ln-checkbox.html',
  styleUrls: ['ln-checkbox.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => LnCheckBox),
      multi: true
    }
  ],
  encapsulation: ViewEncapsulation.None
})
export class LnCheckBox implements ControlValueAccessor {
  @Input()
  get value(): boolean | Constant.Checkbox {
    return this._value;
  }
  set value(v: boolean | Constant.Checkbox) {
    if (Library.isBoolean(v) || Library.isEnum(Constant.Checkbox, v)) {
      if (v !== this._value) {
        this._value = v;
        this.onChange(v);
      }
    }
  }
  @Input() public label: string;
  @Input() public indeterminate: boolean;
  @Input() public disabled: boolean;
  @Input() public hidden: boolean;
  @Input() public visibility: boolean;
  @Input() public style: object;
  @Output() public onClick: EventEmitter<boolean | Constant.Checkbox> = new EventEmitter();
  /**
   * Private Variables
   */
  private _value: any;
  private _iconName: string;

  constructor() {
    this.value = false;
    this.label = '';
    this.visibility = true;
    this.indeterminate = false;
    this.style = {};
  }

  private updateName(): void {
    switch (this.value) {
      case Constant.Checkbox.Checked:
      case true:
        this._iconName = CheckboxIconName.SELECTED;
        break;
      case Constant.Checkbox.Unchecked:
      case false:
        this._iconName = CheckboxIconName.UNSELECTED;
        break;
      default:
        this._iconName = CheckboxIconName.DESELECT;
    }
  }

  public writeValue(value: boolean | Constant.Checkbox) {
    if (Library.isBoolean(value) || Library.isEnum(Constant.Checkbox, value)) {
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

  public getName(): string {
    this.updateName();
    return this._iconName;
  }
  //
  // handleClick()
  //
  public handleClick($event: MouseEvent) {
    $event.preventDefault();
    $event.stopPropagation();
    this.value = !this.value;
    if (Library.isDefined(this.onClick)) {
      this.onClick.emit(this.value);
    }
  }

  /**
   * isEmpty()
   * Determines if the value property is deemed as empty.
   */
  public isEmpty(): boolean {
    return !this.value || this.value === Constant.Checkbox.Unchecked;
  }
  /**
   * empty()
   * Set the value property to an empty state.
   */
  public empty(): void {
    this.writeValue(false);
  }
}
