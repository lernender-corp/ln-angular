import { Component, Input, ViewEncapsulation } from '@angular/core';
import { CdkBase } from '../../../cdk';

@Component({
  moduleId: module.id,
  selector: 'ln-tab',
  templateUrl: 'ln-tab.html',
  styleUrls: ['ln-tab.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LnTab extends CdkBase {
  @Input() public label: string;
  @Input() public active: boolean;
  @Input() public disabled: boolean;

  constructor() {
    super();
    this.label = '';
    this.active = false;
    this.disabled = false;
  }
}
