import { Component, Input } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'ln-toolbar-item',
  templateUrl: './ln-toolbar-item.html',
  styleUrls: ['ln-toolbar-item.css']
})
export class LnToolbarItem {
  @Input() public hidden: boolean;
  @Input() public disabled: boolean;
  @Input() public align: string;

  constructor() {
    this.align = '';
  }
}
