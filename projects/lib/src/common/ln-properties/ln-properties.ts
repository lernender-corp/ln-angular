import { Component, Input, ViewEncapsulation } from '@angular/core';
import { CdkBase } from '../../cdk';

@Component({
  moduleId: module.id,
  selector: 'ln-properties',
  templateUrl: 'ln-properties.html',
  styleUrls: ['ln-properties.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LnProperties extends CdkBase {
  @Input() public attributes: any[];
  constructor() {
    super();
  }
}
