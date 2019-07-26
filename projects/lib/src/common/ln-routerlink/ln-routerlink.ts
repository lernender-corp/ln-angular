import { Component, Input, ViewEncapsulation } from '@angular/core';
import { Library } from '@lernender/core';

@Component({
  moduleId: module.id,
  selector: 'ln-routerlink',
  templateUrl: 'ln-routerlink.html',
  styleUrls: ['ln-routerlink.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LnRouterLink {
  @Input() public disabled: boolean;
  @Input() public hidden: boolean;
  @Input() public style: object;
  @Input() public route: string[];
  @Input() public active: boolean;
  @Input() public pattern: string;
  @Input() public label: string;

  constructor() {
    this.label = '';
    this.route = [''];
    this.active = false;
    this.pattern = 'capitalize';
    this.disabled = false;
    this.hidden = false;
    this.style = {};
  }

  /**
   * hasPattern()
   */
  public hasPattern() {
    return Library.isStringWithLength(this.pattern);
  }
}
