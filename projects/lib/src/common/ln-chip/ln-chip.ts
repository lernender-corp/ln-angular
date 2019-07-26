import {
  Component,
  Input,
  ViewEncapsulation,
  Output,
  EventEmitter,
  ElementRef,
  OnInit,
  AfterViewInit
} from '@angular/core';
import { Node } from '../../cdk';

@Component({
  selector: 'ln-chip',
  templateUrl: 'ln-chip.html',
  styleUrls: ['ln-chip.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class LnChip implements OnInit, AfterViewInit {
  @Input() public disabled: boolean;
  @Input() public hidden: boolean;
  @Input() public style: object;
  @Input() public node: Node;
  @Output() public onClick: EventEmitter<Node> = new EventEmitter();

  public width: number;

  //
  // ngOnInit()
  //
  public ngOnInit() {
    // this.node.label = `${123}`;
    this.setDisplay();
  }
  //
  // ngAfterViewInit()
  //
  public ngAfterViewInit() {
    //
    // Set the width of the container
    //
    const name = document.getElementById(this.node.uid);
    if (name) {
      this.width = name.getBoundingClientRect().width === 0 ? 110 : name.getBoundingClientRect().width;
    }
  }
  //
  // handleClick()
  //
  public handleClick($event: MouseEvent) {
    if ($event) {
      this.node.active = true;
      this.setDisplay();
      this.onClick.emit(this.node);
    }
  }
  //
  // setDisplay()
  //
  public setDisplay(hover: boolean = false) {
    this.node.hover = hover;
    this.node.icon.hidden = hover ? false : !this.node.hasLabel();

    if (this.node.active) {
      this.node.icon.name = hover ? 'close' : this.node.hasLabel() ? 'bullet' : '';
    } else {
      this.node.icon.name = hover ? 'add' : this.node.hasLabel() ? 'bullet' : '';
    }
  }

  constructor(private el: ElementRef) {
    this.style = {};
    this.disabled = false;
    this.hidden = false;
    this.node = new Node();
  }
}
