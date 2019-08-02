import { Component, Input, ViewEncapsulation, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Library, GridCell } from '@lernender/core';

export enum LnGridIconRef {
  TEXT_ALIGN = 'text-align',
  CELL_ALIGN = 'cell-align',
  CELL_DISPLAY = 'cell-display',
  ICON_CONTAINER_PADDING_RIGHT = 'icon-container-padding-right',
  LABEL_MATCH_ICON_HOVER = 'label-match-icon-hover'
}

@Component({
  moduleId: module.id,
  selector: 'ln-grid-icon',
  templateUrl: 'ln-grid-icon.html',
  styleUrls: ['ln-grid-icon.css'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LnGridIcon implements OnInit {
  @Input() public model: GridCell;

  public shouldLabelHoverMatchIconHover: boolean = false;
  public cellStyle: object = {};
  public gridIconContainerStyle: object = {};

  /**
   * Constructor()
   */
  constructor() {
    this.model = new GridCell();
  }

  public ngOnInit(): void {
    let property = LnGridIconRef.LABEL_MATCH_ICON_HOVER;
    this.shouldLabelHoverMatchIconHover = this._modelRefHasProperty(property) && this.model.ref[property];

    property = LnGridIconRef.CELL_ALIGN;
    if (this._modelRefHasProperty(property) && Library.isStringWithLength(this.model.ref[property])) {
      this.cellStyle = {
        'justify-content': this.model.ref[property]
      };
    }

    property = LnGridIconRef.CELL_DISPLAY;
    if (this._modelRefHasProperty(property) && Library.isStringWithLength(this.model.ref[property])) {
      this.cellStyle = {
        'display': this.model.ref[property]
      };
    }

    property = LnGridIconRef.ICON_CONTAINER_PADDING_RIGHT;
    if (this._modelRefHasProperty(property) && Library.isStringWithLength(this.model.ref[property])) {
      this.gridIconContainerStyle = {
        'padding-right': this.model.ref[property]
      };
    }
  }

  public textAlign() {
    const property = LnGridIconRef.TEXT_ALIGN;
    if (this._modelRefHasProperty(property) && Library.isStringWithLength(this.model.ref[property])) {
      return this.model.ref[property];
    }
    return 'right';
  }

  private _modelRefHasProperty(property: string): boolean {
    return Library.isDefined(this.model.ref) && Library.hasOwnProperty(this.model.ref, property);
  }
}
