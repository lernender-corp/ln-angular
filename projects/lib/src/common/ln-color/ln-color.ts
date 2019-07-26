import { Component, Input, Output, EventEmitter, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Color } from '../../cdk';

@Component({
  moduleId: module.id,
  selector: 'ln-color',
  templateUrl: 'ln-color.html',
  styleUrls: ['ln-color.scss']
})
export class LnColor implements OnInit {
  public checkmarkStyle = {
    color: '#FFFFFF',
    'font-size': '22px',
    position: 'relative',
    top: '-3.1px',
    left: '-2.1px',
    'text-shadow': '1px 1px 4px #000000'
  };

  public imageCheckmarkStyle = {
    color: '#FFFFFF',
    'font-size': '22px',
    position: 'relative',
    top: '-21.7px',
    left: '-1.1px',
    'text-shadow': '1px 1px 4px #000000'
  };

  @Input() public color: Color;
  @Input() public hidden: boolean;
  @Input() public disabled: boolean;
  @Input() public checked: boolean;
  @Input() public borderColor: string;
  @Input() public shape: string = 'circle';
  @Input() public templateExists: boolean;
  @Output() public onClick: EventEmitter<object> = new EventEmitter();
  @ViewChild('swatchTooltip', { static: true }) public template: TemplateRef<any>;
  private _borderColorCd: string = 'rgba(27,37,50,.18)';
  private _hexCodeExpression = /[0-9A-Fa-f]{6}/g;

  constructor() {}

  public ngOnInit() {
    if (this.borderColor) {
      if (this._hexCodeExpression.test(this.borderColor)) {
        this._borderColorCd = '#' + this.borderColor;
      } else {
        console.warn(
          'Invalid color code assigned. Could not override border color.'
        );
      }
    }
    if (this.shape !== 'square' && this.shape !== 'circle') {
      this.shape = 'circle';
    }
  }

  public toggleSelection(): void {
    if (!this.disabled) {
      this.checked = !this.checked;
      this.onClick.emit({ color: this.color, checked: this.checked });
    }
  }

  public getColorStyle(color: Color) {
    return {
      backgroundColor: `${color.hexColor()}`,
      border: `1px solid ${this._borderColorCd}`
    };
  }
}
