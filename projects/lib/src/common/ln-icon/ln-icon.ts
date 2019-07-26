import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewEncapsulation,
  OnChanges,
  ChangeDetectionStrategy
} from '@angular/core';
import { Library } from '@lernender/core';

@Component({
  moduleId: module.id,
  selector: 'ln-icon',
  templateUrl: 'ln-icon.html',
  styleUrls: ['ln-icon.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LnIcon implements OnChanges{
  @Input() public disabled: boolean;
  @Input() public hidden: boolean;
  @Input() public active: boolean;
  @Input() public style: object;
  @Input() public color: string;
  @Input() public type: string;
  @Input() public name: string;
  @Input() public padLeft: boolean;
  @Input() public padRight: boolean;
  @Input() public inputIcon: boolean;
  @Output() public onClick: EventEmitter<any> = new EventEmitter();
  public classList: string;
  public classNameArr: string[];

  constructor() {
    this.type = 'toyota-icon';
    this.active = false;
    this.name = '';
    this.color = '';
    this.disabled = false;
    this.hidden = false;
    this.disabled = false;
    this.hidden = false;
    this.style = {};
    this.padLeft = false;
    this.padRight = false;
    this.inputIcon = false;
  }

  public ngOnInit() {
    this.getToyotaClass();
  }

  public ngOnChanges(): void {
    this.getToyotaClass();
  }

  public handleOnClick($event: MouseEvent) {
    if (Library.isDefined(this.onClick)) {
      this.onClick.emit($event);
    }
  }

  public getToyotaClass() {
    let className = `${this.type} ${this.name}`;
    if(this.padLeft) {
      className+=` pad-left`;
    }
    if(this.padRight) {
      className+=` pad-right`;
    }
    this.classNameArr = [className];
  }
}
