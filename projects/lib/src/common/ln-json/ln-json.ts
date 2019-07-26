import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'ln-json',
  templateUrl: 'ln-json.html',
  styleUrls: ['ln-json.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LnJson {
  @Input() public disabled: boolean;
  @Input() public hidden: boolean;
  @Input() public style: object;
  @Input() public value: object;

  constructor() {
    this.value = {};
    this.disabled = false;
    this.hidden = false;
    this.style = {};
  }
}
