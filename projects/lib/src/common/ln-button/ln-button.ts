import {
  Component,
  Input,
  Output,
  OnInit,
  ViewEncapsulation,
  EventEmitter,
  ElementRef,
  OnChanges
} from '@angular/core';
import { Library, Action } from '@lernender/core';

const DEFAULT_BUTTON_CLASS = 'btn-primary';

@Component({
  moduleId: module.id,
  selector: 'ln-button',
  templateUrl: 'ln-button.html',
  styleUrls: ['ln-button.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LnButton implements OnInit, OnChanges {
  /**
   * Inputs
   */
  @Input() public disabled: boolean;
  @Input() public hidden: boolean;
  @Input() public style: object;
  @Output() public onClick: EventEmitter<any> = new EventEmitter();

  public parentClasses: string[];

  constructor(private element: ElementRef) {
    this.disabled = false;
    this.hidden = false;
    this.style = {};
  }

  /**
   * handleClick()
   */
  public handleClick($event: MouseEvent) {
    if (this.onClick) {
      this.onClick.emit($event);
    }
  }

  /**
   * ngOnInit()
   */
  public ngOnInit(): void {
    this._udpateToUseProperties();
  }

  public ngOnChanges(): void {
    this._udpateToUseProperties();
  }

  // This method needs to be as fast as possible since it could get call a lot
  private _udpateToUseProperties(): void {
    const list = Array.from(this.element.nativeElement.classList) as string[];
    if (Library.isArrayWithLength(list)) {
      this.parentClasses = list;
    } else {
      this.parentClasses = [DEFAULT_BUTTON_CLASS];
    }
  }
}
