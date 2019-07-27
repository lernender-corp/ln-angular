import {
  Component,
  OnInit,
  Input,
  Output,
  ViewEncapsulation,
  OnChanges,
  SimpleChange,
  EventEmitter
} from '@angular/core';
import { CdkBase, Color } from '../../cdk';
import { Library, Response } from '@lernender/core';

@Component({
  moduleId: module.id,
  selector: 'ln-color-swatch',
  templateUrl: './ln-color-swatch.html',
  styleUrls: ['ln-color-swatch.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LnColorSwatch extends CdkBase implements OnChanges, OnInit {
  @Input() public label: string;
  @Input() public orientation: string;
  @Output() public onClick: EventEmitter<Color> = new EventEmitter();

  public colors: Color[];

  constructor() {
    super();
    this.colors = [];
    this.orientation = 'horizontal';
  }

  //
  // handleColorClick()
  //
  public handleColorClick(color: Color) {
    if (Library.isDefined(this.onClick)) {
      this.onClick.emit(color);
    }
  }

  //
  // ngOnInit()
  //
  public ngOnInit() {}
  //
  // ngOnChanges
  //
  public ngOnChanges(changes: { [propName: string]: SimpleChange }) {
    //
    // Initialize Component
    //
    if (Library.isDefined(changes['dataEventHandler'])) {
      if (Library.isDefined(changes['dataEventHandler'].currentValue)) {
        /**
         * Register Data Event Listener
         */
        this.registerDataEventHandler((resp: Response) => {
          if (resp.hasData()) {
            this.colors = resp.data;
          }
        });
      }
    }
  }
  //
  // getColorStyle()
  //
  public getColorStyle(color: Color) {
    return {
      backgroundColor: `${color.hexColor()}`,
      border: `1px solid ${color.hexColor()}`
    };
  }
}
