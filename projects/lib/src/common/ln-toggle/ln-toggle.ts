import {
  Input,
  Output,
  EventEmitter,
  ElementRef,
  OnInit,
  ViewChild,
  Component,
  forwardRef,
  ViewEncapsulation
} from '@angular/core';
import { Library } from '@lernender/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  moduleId: module.id,
  selector: 'ln-toggle',
  templateUrl: 'ln-toggle.html',
  styleUrls: ['ln-toggle.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => LnToggle),
      multi: true
    }
  ],
  encapsulation: ViewEncapsulation.None
})

export class LnToggle implements ControlValueAccessor, OnInit  {
  @Input() public disabled: boolean;
  @Input() public hidden: boolean;
  @Input() public style: object;
  @Input() public labelPosition: 'before' | 'after' = 'before';
  @Input() public label: string;
  @Input() public toggleIcon: boolean;
  @Input() public toggleOnText: string;
  @Input() public toggleOffText: string;
  @Output() public click: EventEmitter<boolean> = new EventEmitter();


  @Input()
  get value(): boolean {
    return this._value;
  }
  set value(v: boolean) {
    if (Library.isBoolean(v)) {
      if (v !== this._value) {
        this._value = v;
        this.onChange(v);
      }
    }
  }
  @ViewChild('button', { static: true }) private _buttonElement: ElementRef<HTMLButtonElement>;
  private _value: any;

  constructor(private element: ElementRef) {
    this.value = false;
    this.disabled = false;
    this.hidden = false;
    this.toggleIcon = false;
  }

  public ngOnInit() {
    this.parseToggleText();
  }

  public onChange = (_: any) => {};
  public onTouched = () => {};

  public registerOnChange(fn: (_: any) => void): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  public handleClick($event: MouseEvent) {
    $event.preventDefault();
    $event.stopPropagation();
    this.value = !this.value;
    if (this.click) {
      this.click.emit(this.value);
    }
  }

  public writeValue(value: boolean) {
    if (Library.isBoolean(value)) {
      this._value = value;
      this.onChange(this._value);
    }
  }

  public parseToggleText() {
    if (Library.isNullOrUndefined(this.toggleOnText)  || Library.isNullOrUndefined(this.toggleOffText)) {
      this.toggleOnText = '';
      this.toggleOffText = '';
    } else {
      let textLength = 0;
      if (this.toggleOnText.length >= this.toggleOffText.length) {
        textLength = this.toggleOnText.length;
      } else {
        textLength = this.toggleOffText.length;
      }
      if (textLength > ToggleTextLength.LARGE) {
        this._buttonElement.nativeElement.style.width = '80px';
      } else if (textLength > ToggleTextLength.MEDIUM) {
        this._buttonElement.nativeElement.style.width = '65px';
      } else {
        this._buttonElement.nativeElement.style.width = '50px';
      }
    }
  }
}

const ToggleTextLength = {
  SMALL: 1,
  MEDIUM: 3,
  LARGE: 6
};
