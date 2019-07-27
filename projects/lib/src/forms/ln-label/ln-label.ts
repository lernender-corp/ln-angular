import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'ln-label',
  templateUrl: 'ln-label.html',
  styleUrls: ['ln-label.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LnLabel {
  @Input() public disabled: boolean;
  @Input() public hidden: boolean;
  @Input() public help: boolean;
  @Input() public style: object;
  @Input() public state: string;

  constructor() {
    this.help = false;
    this.disabled = false;
    this.hidden = false;
    this.style = {};
    this.state = 'normal';
  }
}
