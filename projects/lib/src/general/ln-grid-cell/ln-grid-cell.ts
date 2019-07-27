import {
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  ViewContainerRef,
  OnInit,
  OnChanges,
  OnDestroy,
  Renderer,
  ChangeDetectionStrategy
} from '@angular/core';
import { get } from 'lodash-es';
import { GridColumn, GridRow, Library } from '@lernender/core';

import { LnGridCheckBox } from '../ln-grid-checkbox';
import { LnGridColor } from '../ln-grid-color';
import { LnGridFilter } from '../ln-grid-filter';
import { LnGridIcon } from '../ln-grid-icon';
import { LnGridImage } from '../ln-grid-image';
import { LnGridInput } from '../ln-grid-input';
import { LnGridText } from '../ln-grid-text';
import { LnGridNumber } from '../ln-grid-number';

import {
  LnDate,
  LnHtml,
  LnCurrency,
  LnHyperLink,
  LnIcon,
  LnImage,
  LnJson,
  LnNumber,
  LnPercent,
  LnText,
  LnTextArea,
  LnInput
} from '../../common';
import { LnCheckBox, LnDropDown } from '../../forms';
import { Subscription } from 'rxjs';

/**
 * Entry Components
 */
@Component({
  moduleId: module.id,
  selector: 'ln-grid-cell',
  templateUrl: 'ln-grid-cell.html',
  styleUrls: ['ln-grid-cell.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  entryComponents: [
    LnCheckBox,
    LnCurrency,
    LnDate,
    LnDropDown,
    LnGridCheckBox,
    LnGridColor,
    LnGridFilter,
    LnGridIcon,
    LnGridImage,
    LnGridInput,
    LnGridText,
    LnGridNumber,
    LnHtml,
    LnHyperLink,
    LnIcon,
    LnImage,
    LnInput,
    LnJson,
    LnNumber,
    LnPercent,
    LnText,
    LnTextArea
  ]
})

/**
 */
export class LnGridCell implements OnInit, OnChanges, OnDestroy {
  @ViewChild('idd', { read: ViewContainerRef, static: true }) public target: ViewContainerRef;
  @Input() public column: GridColumn;
  @Input() public row: GridRow;
  @Input() public disabled: boolean;
  @Output() public onChange: EventEmitter<any> = new EventEmitter();
  @Output() public onCheck: EventEmitter<any> = new EventEmitter();
  @Output() public onAdd: EventEmitter<any> = new EventEmitter();
  @Output() public onEdit: EventEmitter<any> = new EventEmitter();
  @Output() public onDelete: EventEmitter<any> = new EventEmitter();
  @Output() public onActivated: EventEmitter<any> = new EventEmitter();
  @Output() public onDeactivated: EventEmitter<any> = new EventEmitter();
  @Output() public onRevert: EventEmitter<any> = new EventEmitter();
  @Output() public onDownload: EventEmitter<any> = new EventEmitter();
  @Output() public onIcon: EventEmitter<any> = new EventEmitter();
  @Output() public onLink: EventEmitter<any> = new EventEmitter();
  @Output() public onView: EventEmitter<any> = new EventEmitter();
  @Output() public onFilter: EventEmitter<any> = new EventEmitter();

  private isViewInitialized: boolean = false;

  private componentRef: ComponentRef<any>;
  private _subscriptions: Subscription[];

  /**
   * constructor()
   */
  constructor(
    protected resolver: ComponentFactoryResolver,
    private _renderer: Renderer
  ) {
    this._subscriptions = [];
  }

  /**
   */
  public ngOnDestroy() {
    //
    // Destroy this reference
    //
    this.destroyComponent();
  }

  /**
   */
  public ngOnInit() {
    this.isViewInitialized = true;
    this.drawl();
  }

  /**
   */
  public ngOnChanges(): void {
    this.drawl();
  }

  /**
   */
  private destroyComponent() {
    if (this.componentRef) {
      this.componentRef.destroy();
    }

    if (Library.isArrayWithLength(this._subscriptions)) {
      for (const subscription of this._subscriptions) {
        subscription.unsubscribe();
      }
    }
  }

  /**
   */
  private getComponent(component: string): any {
    switch (component) {
      case 'LnHtml':
        return LnHtml;
      case 'LnCurrency':
        return LnCurrency;
      case 'LnCheckBox':
        return LnCheckBox;
      case 'LnDate':
        return LnDate;
      case 'LnHyperLink':
        return LnHyperLink;
      case 'LnDropDown':
        return LnDropDown;
      case 'LnIcon':
        return LnIcon;
      case 'LnJson':
        return LnJson;
      case 'LnInput':
        return LnInput;
      case 'LnPercent':
        return LnPercent;
      case 'LnNumber':
        return LnNumber;
      case 'LnGridCheckBox':
        return LnGridCheckBox;
      case 'LnGridIcon':
        return LnGridIcon;
      case 'LnGridColor':
        return LnGridColor;
      case 'LnGridImage':
        return LnGridImage;
      case 'LnGridText':
        return LnGridText;
      case 'LnGridFilter':
        return LnGridFilter;
      case 'LnGridInput':
        return LnGridInput;
      case 'LnTextArea':
        return LnTextArea;
      case 'LnGridNumber':
        return LnGridNumber;
      default:
        return LnText;
    }
  }

  /**
   */
  private drawl() {

    if (!this.isViewInitialized) {
      return;
    }

    //
    // Destroy existing component reference
    //
    this.destroyComponent();

    if (Library.isObject(this.column)) {
      //
      // If we have a getll Render Function
      //
      if (this.column.hasCellRender()) {
        this._renderer.setElementProperty(this.target.element.nativeElement, 'innerHTML',
        this.column.onCellRender(this.row.data) || this.column.defaultDisplay);
      } else {
        //
        // Load the component
        //
        const componentFactory = this.resolver.resolveComponentFactory(
          this.getComponent(this.column.cellComponent.type)
        );
        //
        // Component Reference
        //
        this.componentRef = this.target.createComponent(componentFactory);
        //
        // Adorn the component with information
        //
        if (Library.isObject(this.componentRef.instance)) {
          //
          // Switch on Column Type
          //
          switch (this.column.cellComponent.type) {
            default:
              //
              // If the field has an object Field reference then extract the value
              //
              this.componentRef.instance.align = this.column.align;
              //
              // Set default value
              //
              let value = get(
                this.row.data,
                this.column.field.name
              );
              //
              // If value is defined/exists then...
              //
              if (!Library.isUndefined(value)) {
                this.componentRef.instance.value = value;
              }

              //
              // Set Default Properties for all components
              //
              this.componentRef.instance.style = { ...this.column.style };
              this.componentRef.instance.disabled = this.column.disabled;
              this.componentRef.instance.hidden = this.column.hidden;

              if (this.column.hasCellComponent()) {
                this.componentRef.instance.cols = this.column.cellComponent.cols;
                this.componentRef.instance.dataTextField = this.column.cellComponent.dataTextField;
                this.componentRef.instance.dataValueField = this.column.cellComponent.dataValueField;
                this.componentRef.instance.disabled = this.column.cellComponent.disabled;
                this.componentRef.instance.hidden = this.column.cellComponent.hidden;
                this.componentRef.instance.hover = this.column.cellComponent.hover;
                this.componentRef.instance.indicatorIcon = this.column.cellComponent.indicatorIcon;
                this.componentRef.instance.maxlength = this.column.cellComponent.maxlength;
                this.componentRef.instance.minlength = this.column.cellComponent.minlength;
                this.componentRef.instance.multiple = this.column.cellComponent.multiple;
                this.componentRef.instance.pattern = this.column.cellComponent.pattern;
                this.componentRef.instance.placeholder = this.column.cellComponent.placeholder;
                this.componentRef.instance.rows = this.column.cellComponent.rows;
                this.componentRef.instance.style = this.column.cellComponent.style;

                if (this.column.cellComponent.hasItems()) {
                  this.componentRef.instance.items = this.column.cellComponent.items;
                }

                if (
                  Library.hasOwnProperty(
                    this.componentRef.instance,
                    'onValueChange'
                  )
                ) {
                  this._subscriptions.push(
                    this.componentRef.instance.onValueChange.subscribe(
                      (filter: any) => {
                        this.column.filter = filter;
                        this.column.onFilter(this.column.filter, this.column);
                      }
                    )
                  );
                }
              }
              //
              // Apply Rule
              //
              if (Library.isFunction(this.column.onRule)) {
                this.componentRef.instance.model = this.column.onRule(this.row.data);
                const {
                  value,
                  hidden,
                  disabled,
                  style,
                  align,
                  classList,
                  cancelEventPropagation,
                  tooltip
                } = this.componentRef.instance.model;

                if (align) {
                  this.componentRef.instance.align = align;
                }
                if (value) {
                  this.componentRef.instance.value = value;
                }
                if (hidden) {
                  this.componentRef.instance.hidden = hidden;
                }
                if (disabled) {
                  this.componentRef.instance.disabled = disabled;
                }
                if (style) {
                  this.componentRef.instance.style = style;
                }
                if (classList) {
                  this.componentRef.instance.classList = classList;
                }
                if (tooltip) {
                  this.componentRef.instance.tooltip = tooltip;
                }
                if (cancelEventPropagation) {
                  this.componentRef.instance.cancelEventPropagation = cancelEventPropagation;
                }
              }
              break;
          }
        }
      }
    }
  }
}
