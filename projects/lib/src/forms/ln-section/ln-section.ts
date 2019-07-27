import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewEncapsulation,
  TemplateRef,
  OnInit
} from '@angular/core';
import { Guid, Library, Element } from '@lernender/core';

@Component({
  moduleId: module.id,
  selector: 'ln-section',
  templateUrl: './ln-section.html',
  styleUrls: ['ln-section.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LnSection implements OnInit {
  @Input() public hidden: boolean;
  @Input() public disabled: boolean;
  @Input() public label: string;
  @Input() public description: string;
  @Input() public active: boolean;
  @Input() public actions: Element[];
  @Input() public headerStyle: object;
  @Input() public contentStyle: object;
  @Input() public style: object;
  @Input() public iconRight: boolean;
  @Input() public template: TemplateRef<any>;
  @Input() public hiddenIconOnExpand: boolean;
  @Input() public allowExpand: boolean;
  @Input() public small: boolean;
  @Input() public borderTop: boolean;
  @Input() public bypassNoDataMessage: boolean;
  @Output() public onactive: EventEmitter<any> = new EventEmitter<any>();

  public uid: string;
  public icon: string;

  private readonly icons = {
    down: 'arrow-half-dwn',
    left: 'arrow-half-right',
    right: 'arrow-half-left'
  };

  constructor() {
    this.uid = Guid.NEW();
    this.hidden = false;
    this.disabled = false;
    this.active = false;
    this.actions = [];
    this.description = '';
    this.headerStyle = {};
    this.style = {};
    this.contentStyle = {};
    this.iconRight = false;
    this.hiddenIconOnExpand = false;
    this.allowExpand = true;
    this.small = false;
    this.borderTop = false;
  }

  public OnClick($event: MouseEvent) {
    if (this.allowExpand === true) {
      $event.preventDefault();
      this.active = !this.active;
      this.icon = this._getIcon();
      if (Library.isDefined(this.onactive)) {
        this.onactive.emit({
          id: this.uid,
          label: this.label,
          active: this.active
        });
      }
    }
  }
  public ngOnInit() {
    this.icon = this._getIcon();
  }
  /**
   * Returns right icon based on the icon location and status
   */
  private _getIcon() {
    if (this.active) {
      return this.icons.down;
    }
    return this.iconRight ? this.icons.right : this.icons.left;
  }
}
