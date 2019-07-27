import {
  AfterContentInit,
  AfterViewInit,
  Component,
  TemplateRef,
  Input,
  OnInit,
  Output,
  EventEmitter
} from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem
} from '@angular/cdk/drag-drop';
import { Group, Library, Action } from '@lernender/core';
// import { LnDragDropItem } from '@lernender/forms/ln-dragdrop-item';

@Component({
  moduleId: module.id,
  selector: 'ln-dragdrop-panel',
  templateUrl: 'ln-dragdrop-panel.html',
  styleUrls: ['ln-dragdrop-panel.scss']
})
export class LnDragDropPanel
  implements OnInit, AfterContentInit, AfterViewInit {
  @Input() public disabled: boolean;
  @Input() public hidden: boolean;
  @Input() public style: object;
  @Input() public titleStyle: object;
  @Input() public containerStyle: object;
  @Input() public listStyle: object;
  @Input() public data: Group[];
  @Input() public template: TemplateRef<any>;
  @Input() public arrange: boolean;
  @Input() public direction: string;

  @Output() public onDrop: EventEmitter<any> = new EventEmitter<any>();
  @Output() public onMouseUp: EventEmitter<any> = new EventEmitter<any>();
  @Output() public onMouseDown: EventEmitter<any> = new EventEmitter<any>();
  @Output() public onMouseEnter: EventEmitter<any> = new EventEmitter<any>();
  @Output() public onMouseLeave: EventEmitter<any> = new EventEmitter<any>();

  // @ContentChildren(LnDragDropItem) public items: QueryList<LnDragDropItem>;

  public dragdropIcon;
  public clickedItem;
  public iconStyle;

  constructor() {
    this.disabled = false;
    this.hidden = false;
    this.style = {};
    this.containerStyle = {};
    this.listStyle = {};
    this.data = [];
    this.dragdropIcon = 'move';
    this.arrange  = false;
    this.clickedItem = null;
    this.direction = 'horizontal';
    this.iconStyle = {
      'float': 'left',
      'color': '#BE0304'
    };
    this.titleStyle = {};
  }
  //
  // ngAfterContentInit()
  //
  public ngAfterContentInit() {}

  public ngAfterViewInit() {}

  //
  // ngOnInit()
  //
  public ngOnInit() {
    this.arrangeItems();
    this.data.forEach(container => {
      container['groupName'] = this.getGroupName(container.name);
    });
  }

  public drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
        transferArrayItem(
          event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex
        );
        this.arrangeItems();
    }
    this.clickedItem = null;
    this.onDrop.emit({event, data: this.data, items: this.getAllItems()});
  }

  public mouseUp(container: Group, item: Action) {
    this.clickedItem = null;
    this.onMouseUp.emit({container, item});
  }

  public mouseDown(container: Group, item: Action) {
    this.clickedItem = item;
    this.onMouseDown.emit({container, item});
  }

  public handleMouseEnter(container: Group, item: Action) {
    item.active = true;
    this.onMouseEnter.emit({container, item});
  }

  public handleMouseLeave(container: Group, item: Action) {
    item.active = false;
    this.onMouseLeave.emit({container, item});
  }

  public _handleOnClick(item: Action) {
    item.checked = !item.checked;
    if (Library.isDefined(item.onClick)) {
      item.onClick({item, data: this.data});
    }
  }

  public getGroupName(name: string) {
    const groupNames = this.data.filter(f => f.name === name).map(g => g.uid);
    return groupNames;
  }

  //
  // Method to Arrange the Items equally for each container
  //
  private arrangeItems() {
    if (this.arrange && Library.isArrayWithLength(this.data)) {
      const items = this.getAllItems();
      const len = Math.round(items.length / this.data.length);
      const containerLen =  this.data.length;

      for (let i = 0; i < containerLen; i++) {
        this.data[i].children = (i === containerLen - 1) ? items : items.splice(0, len);
      }
    }
  }

  private getAllItems() {
    let items = [];
    this.data.map(_ => {
      items = items.concat(_.children);
    });
    return items;
  }
}
