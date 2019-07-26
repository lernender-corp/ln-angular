import {
  Component,
  Input,
  ViewEncapsulation,
  Output,
  EventEmitter,
} from '@angular/core';
//
// Toyota modules
//
import { Library, Constant } from '@lernender/core';
import { Node } from '../../../cdk';

@Component({
  selector: 'chip-list',
  templateUrl: 'chip-list.html',
  styleUrls: ['chip-list.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ChipList {
  @Input() public tree: Node;
  @Input() public level: number;
  @Input() public style: object;
  @Output() public onClick: EventEmitter<Node>;

  constructor() {
    this.onClick = new EventEmitter<Node>();
    this.style = {};
  }

  public trackByFn(_index: number, node: Node) {
    return node.uid;
  }
}
