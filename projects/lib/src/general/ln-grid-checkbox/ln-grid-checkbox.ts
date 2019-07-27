import { Component, Input, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { Library, GridCell } from '@lernender/core';

@Component({
  moduleId: module.id,
  selector: 'ln-grid-checkbox',
  templateUrl: 'ln-grid-checkbox.html',
  styleUrls: ['ln-grid-checkbox.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LnGridCheckBox  {
  @Input() public model: GridCell;
  @Input() public hidden: boolean;

  /**
   * Constructor()
   */
  constructor() {
    this.model = new GridCell();
    this.hidden = true;
  }

  //
  // handleClick()
  //
  public handleClick(value: boolean) {
    if (Library.isDefined(this.model.onClick)) {
      this.model.onClick(this.model.id, value);
    }
  }
}
