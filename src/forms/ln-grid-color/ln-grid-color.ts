import { Component, Input, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { Library, GridCell } from '@lernender/core';

@Component({
  moduleId: module.id,
  selector: 'ln-grid-color',
  templateUrl: 'ln-grid-color.html',
  styleUrls: ['ln-grid-color.css'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LnGridColor {
  @Input() public model: GridCell;

  constructor() {
    this.model = new GridCell();
  }

  public textAlign() {
    if (Library.isDefined(this.model.ref)) {
      if (Library.hasOwnProperty(this.model.ref, 'text-align')) {
        if (Library.isStringWithLength(this.model.ref['text-align'])) {
          return this.model.ref['text-align'];
        }
      }
    }
    return 'right';
  }
}
