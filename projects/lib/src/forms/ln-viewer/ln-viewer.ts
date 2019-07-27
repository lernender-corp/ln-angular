import { Component, Input, ViewEncapsulation } from '@angular/core';
import { CdkBase } from '../../cdk';
import { Library } from '@lernender/core';

@Component({
  moduleId: module.id,
  selector: 'ln-viewer',
  templateUrl: './ln-viewer.html',
  styleUrls: ['ln-viewer.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LnViewer extends CdkBase {
  @Input() public label: string;
  @Input() public description: string;

  constructor() {
    super();
    this.label = '';
    this.description = '';
  }

  public hasLabel() {
    return Library.isStringWithLength(this.label);
  }

  public hasDescription() {
    return Library.isStringWithLength(this.description);
  }
}
