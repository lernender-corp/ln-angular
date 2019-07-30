import { Component, ContentChildren, Input, QueryList } from '@angular/core';
import { LnToolbarItem } from '@lernender/forms/ln-toolbar-item';

@Component({
  moduleId: module.id,
  selector: 'ln-toolbar',
  templateUrl: 'ln-toolbar.html',
  styleUrls: ['ln-toolbar.css']
})
export class LnToolbar {
  @Input() public hidden: boolean;
  @Input() public disabled: boolean;
  @Input() public orientation: string;

  @ContentChildren(LnToolbarItem) public items: QueryList<LnToolbarItem>;

  get tabContext() {
    return {
      items: this.items
    };
  }

  constructor() {
    this.orientation = 'horizontal';
  }
}
