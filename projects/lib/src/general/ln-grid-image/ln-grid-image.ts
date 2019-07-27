import { Component, Input, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { GridCell } from '@lernender/core';

@Component({
  moduleId: module.id,
  selector: 'ln-grid-image',
  templateUrl: 'ln-grid-image.html',
  styleUrls: ['ln-grid-image.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LnGridImage {
  @Input() public model: GridCell;

  /**
   * Constructor()
   */
  constructor() {
    this.model = new GridCell();
  }
}
