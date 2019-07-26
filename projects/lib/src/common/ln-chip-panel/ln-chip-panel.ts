import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  QueryList,
  SimpleChanges,
  ViewChild,
  ViewChildren,
  ViewEncapsulation
} from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { CdkScrollable } from '@angular/cdk/overlay';
import { ExtendedScrollToOptions } from '@angular/cdk/scrolling';
//
// Toyota modules
//
import { Library, Constant } from '@lernender/core';
import { ChipList } from './chip-list/chip-list';
import { Node } from '../../cdk';

/* Data model for the chip to build out nodes */
//
// SDL: I'm just curious why we couln't have created a model
//      and inherited from the class Action or at the very
//      least class Base.
//
export interface IChip {
  id: number;
  name: string;
  active: boolean;
  hidden: boolean;
  label: string;
  description: string;
  disabled: boolean;
  children: IChip[];
  parentId: number;
}
/* Data model to tell the chip-panel that there is an update */
export interface ITreeUpdate {
  type: 'add' | 'remove' | 'clear';
  payload: IChip[];
}

type Direction = 'left' | 'right';

@Component({
  selector: 'ln-chip-panel',
  templateUrl: 'ln-chip-panel.html',
  styleUrls: ['ln-chip-panel.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LnChipPanel
  implements OnInit, OnChanges, OnDestroy, AfterViewInit {
  @Input() public disabled: boolean;
  @Input() public hidden: boolean;
  @Input() public style: object;
  @Input() public header: string;
  @Input() public source: IChip[];
  @Input() public update: BehaviorSubject<ITreeUpdate>;
  @Output() public onChange: EventEmitter<Node>;
  @Output() public onRemove: EventEmitter<object>;
  @Output() public onClear: EventEmitter<Node[]>;

  @ViewChildren(ChipList) public chipLists: QueryList<ChipList>;
  @ViewChild(CdkScrollable, { static: true }) public cdkDir: CdkScrollable;
  @ViewChild('panelList', { static: true }) panelList: ElementRef;

  public ROOT: Node;
  public carousel: any;
  public isScrollable: boolean;
  public shouldScroll: any;
  //
  // Subscriptions
  //
  private _subscription: Subscription[];
  private _timeout: any;

  constructor() {
    this.header = '';
    this.style = {};
    this._timeout = false;
    this.shouldScroll = {
      left: false,
      right: false
    };
    this.carousel = {
      panels: [],
      panelIndex: 0,
      next: false,
      style: {
        width: '100%'
      },
      getParentNode: () => {
        if (Library.isDefined(this.panelList)) {
          return this.panelList.nativeElement;
        }
      }
    };

    this.onChange = new EventEmitter<Node>();
    this.onRemove = new EventEmitter<object>();
    this.onClear = new EventEmitter<Node[]>();
    //
    // SDL: This should be Observable<IChip | FilterMessage >
    //
    this.source = [];
    //
    // Root Node
    //
    this.ROOT = new Node({ id: 0, name: 'root' });
    //
    // Subscriptions
    //
    this._subscription = [];
  }

  //
  // ngOnInit()
  //
  public ngOnInit() {
    this._measureScroll();
    this._shouldScroll();
    //
    // If an array of items exists the consume items
    //
    // SDL: This section of code should be moved to ngChanges()
    //      Moreover, this source should be an Observable<IChip>.
    //      Refer to ln-dropdown ngOnChanges() example.
    //
    //      Als0 this class should inherit from CdkBase.
    //
    if (Library.isArrayWithLength(this.source)) {
      this._makeTree(this.source);
    }
    //
    // If a BehaviorSubject was given as an input parameter
    //
    if (Library.isDefined(this.update)) {
      //
      // SDL: So this makes sense as to why the code is here (i.e. this.update property).
      //      It's following the same pattern as the ln-grid. So here's some things
      //      to think about...
      //
      //      1.  Standardize Model: Rather than forcing the parent container to know about a chip or a tree,
      //          its perhaps better to structure this component to interact with a
      //          model. Only, the model is NOT a chip model or a tree model rather it's a more generic
      //          model that makes sense to both the filters and the chip-panel.
      //
      //          For example:
      //
      //          class FilterMessage() {
      //            ...
      //            children: FilterMessage[]
      //          }
      //
      //          rational here is to standardize Filter messages across the board
      //          that both ChipPanel and the Filters can agree on as far as an API.
      //
      //      2.  Hiarchitical Relationship of Nodes
      //          Currently, this code understands and tree relationship of chips.
      //          All chips @ Lvl1 represent the filters from the left panel. All
      //          chips @lvl2 represent the suggested chips corresponding to each
      //          parent's chip.
      //
      //          This tree relationship makes sense and should of course remain.
      //          however, there's another relationship of data that this chip-panel
      //          doesn't know about but needs to be aware of namely, the relationship
      //          of the filters listed @ Lvl1.
      //
      //      3.  Perhaps a way to resolve the deliema of statement #2 is to
      //          uniquely identify each and every filter used by both the left
      //          panel and the suggested chips.
      //
      this._subscription.push(
        this.update.subscribe((updateValue: ITreeUpdate) => {
          /* if objects parent node is already removed do not update the tree */
          //
          //  SDL:  This current code segments requires that the parent send information
          //        in a tree structure and this shouldn't be required. Remember, the
          //        contract/model in the parent container shouldn't know of --or care about
          //        trees. How you choose to make this component work is your choice
          //        and of course is within your domain of responsibility. However,
          //        this doesn't mean that you should force the user of this component
          //        to know or care about tree nodes.
          //
          //        Another side note, most of your communication with the outside world
          //        will be in the form of 'Remove this filter and all it's associated
          //        filters. A filter from the outside world's perspective is just a NAME:VALUE
          //        pair.
          //
          //        The parent container doesn't know of nor should it care about a parentId.
          //
          if (
            updateValue.payload &&
            this._nodeExists(updateValue.payload[0].parentId) &&
            updateValue.type === 'add'
          ) {
            /* on new update is supplied, reconstruct the list */
            this._makeTree(updateValue.payload);
            //
            // SDL: Not sure if it's necessary to have the ChangeDetection Strategy set to onPush().
            //      doens't really make sense for such a small set of Chips.
            //
          } else if (updateValue.type === 'remove') {
            //
            //  SDL:  Samething here, you should be forcing the parent container to conform to your
            //        interal data structures.
            //
            const node = updateValue.payload[0];
            if (!Library.isNullOrUndefined(node)) {
              this._removeNode(new Node(node));
            }
          } else if (updateValue.type === 'clear') {
            this.clear();
          }

          //
          // Set the client Width
          //
          if (!Library.isNullOrUndefined(this.chipLists)) {
            if (this.chipLists.length > 0) {
              this._setCarouselClientWidth();
            } else {
              this.carousel.style['flex'] = '1 1 auto';
              this.carousel.style['width'] = 'auto';
            }
          }
        })
      );
    }
  }
  //
  // ngOnChanges()
  //
  //  SDL: See comments above pertaining to Observable<IChip>()
  //
  public ngOnChanges(changes: SimpleChanges) {
    if (Library.hasOwnProperty(changes, 'source')) {
      if (Library.isArrayWithLength(changes.source.currentValue)) {
        this._makeTree(this.source);
      }
    }
  }
  //
  // ngOnDestroy()
  //
  public ngOnDestroy() {
    if (Library.isArrayWithLength(this._subscription)) {
      this._subscription.forEach(s => s.unsubscribe());
    }
  }
  //
  //  HostListener('window:resize')
  //
  @HostListener('window:resize')
  onResize() {
    //
    // Set the client Width
    //
    this._setCarouselClientWidth();
  }

  //
  //  ngAfterViewInit()
  //
  public ngAfterViewInit(): void {
    this._measureScroll();
  }
  //
  // onNext()
  //
  public onNext() {}
  //
  // onPrevious()
  //
  public onPrevious() {}
  //
  // _setCarouselClientWidth()
  //
  private _setCarouselClientWidth() {
    clearTimeout(this._timeout);
    this._timeout = setTimeout(() => {
      if (Library.isDefined(this.carousel)) {
        const width = this.carousel.getParentNode().clientWidth - 60;
        this.carousel.style['flex'] = `1 1 ${width}px`;
        this.carousel.style['width'] = `${width}px`;
      }
    }, Constant.SetTimoutDelay.Medium);
  }
  //
  /* Removes the node and all the children from the tree */
  //
  public remove(node: Node): boolean {
    const isRemoved = this._removeNode(node);
    if (isRemoved) {
      this.onRemove.emit({
        id: node.id,
        name: node.name,
        description: node.description
      });
    }
    return isRemoved;
  }

  //
  /* Clears the tree up to the root */
  //
  public clear() {
    const children = [...this.ROOT.children];
    this.remove(this.ROOT);
    this.onClear.emit(children);
  }
  /**
   * Removes the node from the tree
   * Adds that node to one level up
   * Changes the state to active
   * Emits the message when node is successfully added
   */
  public move(node: Node) {
    const parentNode = this.ROOT.find(node, 0, this._findNode);
    const isRemoved = this._removeNode(node);
    if (isRemoved) {
      // Refactor _decrement
      node.parentId = parentNode.parentId;
      node.active = true;
      node.label = null;
      const isAdded = this.ROOT.add(node, this._addNode);
      if (isAdded) {
        this.onChange.emit(node);
      }
    }
  }

  /* Creates Tree based on the source data */
  private _makeTree(source: IChip[], level = 0) {
    if (Library.isArrayWithLength(source)) {
      source.forEach((node: any) => {
        this._hydrateNodes(node, level);
      });
    }
  }
  /* Creates node objects recursivly from supplied source of data */
  private _hydrateNodes(node: Node, level: number = 0) {
    if (Library.isDefined(node)) {
      this.ROOT.add(
        new Node({
          id: node.id,
          name: node.name,
          hidden: node.hidden,
          label: node.label,
          description: node.description,
          disabled: node.disabled,
          parentId: node.parentId,
          active: node.active,
          type: node.type
        }),
        this._addNode
      );
      if (Library.hasOwnProperty(node, 'children')) {
        if (Library.isArrayWithLength(node.children)) {
          node.children.forEach(child => {
            this._hydrateNodes(child, level + 1);
          });
        }
      }
    }
  }

  private _removeNode(node: Node): boolean {
    let index = this._findIndex(node, this.ROOT);

    if (node === this.ROOT) {
      // remove root
      this.ROOT.clear(node, () => {});
      return true;
    } else if (index > -1) {
      // remove root child
      this._clearNode(this.ROOT, node, index);
      return true;
    } else {
      // remove suggested chip that is a child of an active root child
      let rootChildren = this.ROOT.children;
      for (let i = this.ROOT.children.length - 1; i > -1; i--) {
        index = this._findIndex(node, rootChildren[i]);
        if (index > -1) {
          this._clearNode(rootChildren[i], node, index);
          return true;
        }
      }
    }
    return false;
  }

  private _findIndex(node: Node, root: Node): number {
    return root.children.findIndex(
      x => x.id === node.id && x.parentId === node.parentId
    );
  }

  private _clearNode(parentNode: Node, node: Node, index: number): void {
    parentNode.clear(node, () => {});
    parentNode.children.splice(index, 1);
  }

  /* Helper Callback Functions */
  private _findNode(a: any, b: any) {
    return a.id === b.parentId;
  }
  private _addNode(a: any, b: any) {
    return a.id === b.parentId;
  }

  /* Finds out whether node exists on the tree based on the id */
  private _nodeExists(id: number): boolean {
    /* Intentionally passing node id instead of node itself */
    const node = this.ROOT.find(
      id,
      0,
      (root: any, obj: any) => root.id === obj
    );
    return Library.isObject(node);
  }

  public scrollTo(direction: Direction) {
    const scrollToOptions: ExtendedScrollToOptions = {
      behavior: 'smooth'
    };
    switch (direction) {
      case 'right':
        scrollToOptions.right = this.measureScrollSize('right');
        break;
      case 'left':
        scrollToOptions.left = this.measureScrollSize('left');
        break;
      default:
        scrollToOptions.left = 0;
        break;
    }
    this.cdkDir.scrollTo(scrollToOptions);
    this._shouldScroll();
  }
  /* Measures by how much elements should scroll */
  public measureScrollSize(direction: Direction) {
    let position;
    if (direction === 'left' && this._clientWidth && this._left) {
      position =
        this._clientWidth > this._left ? 0 : this._left - this._clientWidth;
    }
    if (direction === 'right' && this._clientWidth && this._right) {
      position =
        this._clientWidth > this._right ? 0 : this._right - this._clientWidth;
    }
    return position;
  }

  private _measureScroll() {
    setTimeout(() => {
      if (this._clientWidth && this._scrollWidth) {
        this.isScrollable = this._clientWidth < this._scrollWidth;
      }
    }, 0);
  }
  /* Whether element should scroll (let the browser calculate the scrollWidth to get the accurate value) */
  private _shouldScroll() {
    setTimeout(() => {
      this.shouldScroll = {
        left: Math.floor(this._left),
        right: Math.floor(this._right)
      };
    }, 600);
  }
  /* Getters to measure offset of each direction */
  public get _left() {
    return this.cdkDir.measureScrollOffset('left');
  }
  public get _right() {
    return this.cdkDir.measureScrollOffset('right');
  }
  /* Returns Elements Client Width */
  private get _clientWidth() {
    if (this.cdkDir.getElementRef()) {
      return this.cdkDir.getElementRef().nativeElement.clientWidth;
    }
  }
  /* Returns Elements Scroll Width */
  private get _scrollWidth() {
    if (this.cdkDir.getElementRef()) {
      return this.cdkDir.getElementRef().nativeElement.scrollWidth;
    }
  }
}
