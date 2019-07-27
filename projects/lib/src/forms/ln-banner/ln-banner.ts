import { Component, Input, ViewEncapsulation, TemplateRef } from '@angular/core';
import { Guid, Library, Action } from '@lernender/core';

@Component({
  moduleId: module.id,
  selector: 'ln-banner',
  templateUrl: 'ln-banner.html',
  styleUrls: ['ln-banner.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LnBanner {
  @Input() public disabled: boolean;
  @Input() public hidden: boolean;
  @Input() public style: object;
  @Input() public label: string;
  @Input() public active: boolean;
  @Input() public actions: Action[];
  @Input() public description: string;
  @Input() public template: TemplateRef<any>;

  public uid: string;

  constructor() {
    this.label = '';
    this.uid = Guid.NEW();
    this.active = false;
    this.actions = [];
    this.description = '';
    this.disabled = false;
    this.hidden = false;
    this.style = {};
  }

  public hasLabel() {
    return Library.isStringWithLength(this.label);
  }

  public hasDescription(): boolean {
    return Library.isStringWithLength(this.description);
  }
}
