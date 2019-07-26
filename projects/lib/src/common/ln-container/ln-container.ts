import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'ln-container',
  templateUrl: 'ln-container.html',
  styleUrls: ['ln-container.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LnContainer {
  @Input() public direction: string;
  @Input() public style: object;
  @Input() public disabled: boolean;
  @Input() public hidden: boolean;

  constructor() {
    this.direction = 'vertical';
    this.style = {};
  }
}
