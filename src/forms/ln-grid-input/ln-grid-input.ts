import {
  Component,
  Input,
  ViewEncapsulation,
  ChangeDetectionStrategy
} from '@angular/core';
import { GridCell } from '@lernender/core';

@Component({
  moduleId: module.id,
  selector: 'ln-grid-input',
  templateUrl: 'ln-grid-input.html',
  styleUrls: ['ln-grid-input.css'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LnGridInput {
  @Input() public model: GridCell;

  /**
   * Constructor()
   */
  constructor() {
    this.model = new GridCell();
  }
}
