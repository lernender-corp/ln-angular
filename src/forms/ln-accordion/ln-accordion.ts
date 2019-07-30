import {
  Component,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';
import { Library, Guid, Constant} from '@lernender/core';

@Component({
  moduleId: module.id,
  selector: 'ln-accordion',
  templateUrl: 'ln-accordion.html',
  styleUrls: ['ln-accordion.css'],
  encapsulation: ViewEncapsulation.None
})
export class LnAccordion {
  @Input() public id: number;
  @Input() public name: string;
  @Input() public label: string;
  @Input() public height: string;
  @Input() public mode: string;
  @Input() public active: boolean;
  @Input() public disabled: boolean;
  @Input() public hidden: boolean;
  @Input() public style: object;
  @Input() public icon: boolean;
  @Input() public checked: boolean | Constant.Checkbox;
  @Input() public showChecked: boolean;
  @Input() public showLeftIcon: boolean;
  @Input() public template: TemplateRef<any>;
  @Output() public onClick: EventEmitter<any> = new EventEmitter<any>();
  @Output() public onChecked: EventEmitter<any> = new EventEmitter<any>();

  public uid: string;

  constructor() {
    this.uid = Guid.NEW();
    this.mode = '';
    this.height = 'auto';
    this.label = '<Label>';
    this.active = false;
    this.disabled = false;
    this.hidden = false;
    this.icon = true;
    this.checked = false;
    this.showChecked = false;
    this.showLeftIcon = false;
    this.style = {};
  }

  public getIcon() {
    return !this.active ? 'arrow-half-right' : 'arrow-half-up';
  }

  public toggleClick($event: MouseEvent) {
     if (Library.isDefined(this.onChecked)) {
      $event.preventDefault();
      $event.stopPropagation();
       setTimeout(() => {
         this.onChecked.emit({
           id: this.id,
           name: this.name,
           label: this.label,
           active: this.active,
           checked: this.checked
         });
       }, 10);
     }
     return (this.checked = !this.checked);
  }

  public handleClick($event: MouseEvent) {
    $event.preventDefault();
    this.active = !this.active;
    if (Library.isDefined(this.onClick)) {
      setTimeout(() => {
        this.onClick.emit({
          id: this.id,
          name: this.name,
          label: this.label,
          active: this.active,
          checked: this.checked
        });
      }, 10);
    }
  }
}
