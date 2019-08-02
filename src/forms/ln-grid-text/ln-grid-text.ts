import { Component, Input, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { GridCell } from '@lernender/core';

@Component({
  moduleId: module.id,
  selector: 'ln-grid-text',
  templateUrl: 'ln-grid-text.html',
  styleUrls: ['ln-grid-text.css'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LnGridText {
  @Input() public model: GridCell;

  /**
   * Constructor()
   */
  constructor() {
    this.model = new GridCell();
  }

}
