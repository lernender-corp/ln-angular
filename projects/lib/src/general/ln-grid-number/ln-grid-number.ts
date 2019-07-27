import {
  Component,
  Input,
  ViewEncapsulation,
  ChangeDetectionStrategy
} from '@angular/core';
import { GridCell } from '@lernender/core';

@Component({
  moduleId: module.id,
  selector: 'ln-grid-number',
  templateUrl: 'ln-grid-number.html',
  styleUrls: ['ln-grid-number.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LnGridNumber {
  @Input() public model: GridCell;

  constructor() {
    this.model = new GridCell();
  }
}
