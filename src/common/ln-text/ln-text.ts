import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'ln-text',
  templateUrl: 'ln-text.html',
  styleUrls: ['ln-text.css'],
  encapsulation: ViewEncapsulation.None
})
export class LnText {
  @Input() public disabled: boolean;
  @Input() public hidden: boolean;
  @Input() public value: string;
  @Input() public align: string;
  @Input() public pattern: string;

  constructor() {
    this.value = '';
    this.align = 'left';
    this.pattern = '';
  }
}
