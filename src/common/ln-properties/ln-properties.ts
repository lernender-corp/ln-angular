import { Component, Input, ViewEncapsulation } from '@angular/core';
import { CdkBase } from '@lernender/cdk/cdk-base';

@Component({
  moduleId: module.id,
  selector: 'ln-properties',
  templateUrl: 'ln-properties.html',
  styleUrls: ['ln-properties.css'],
  encapsulation: ViewEncapsulation.None
})
export class LnProperties extends CdkBase {
  @Input() public attributes: any[];
  constructor() {
    super();
  }
}
