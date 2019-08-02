import {
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChange,
  ViewChild,
  ViewEncapsulation,
  TemplateRef
} from '@angular/core';
import { CdkBase } from '@lernender/cdk/cdk-base';
import { Grid } from '@lernender/cdk/cdk-model';
import { BehaviorSubject, Subject, Subscription } from 'rxjs';
import {
  CdkVirtualScrollViewport
} from '@angular/cdk/scrolling';

import {
  GridColumn,
  Constant,
  Library,
  GridFilterFunction,
  GridSchema,
  GridRow,
  Action,
  Response,
  Message,
  GridSummary,
  GridOption
} from '@lernender/core';
import { get, each } from 'lodash-es';
import { LnGridMessageType, ILnGridState } from './ln-grid.constant';

@Component({
  moduleId: module.id,
  selector: 'ln-grid',
  templateUrl: 'ln-grid.html',
  styleUrls: ['ln-grid.css'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LnGrid extends CdkBase
  implements OnInit, OnChanges, OnDestroy, AfterViewInit, AfterViewChecked {
  @Input() public bodyOffset: any;
  @Input() public disabled: boolean;
  @Input() public hidden: boolean;
  @Input() public subject: string;
  @Input() public schema: GridSchema;
  @Input() public actions: Action[];
  @Input() public listener: Subject<Message>;
  @Input() public options: GridOption;
  @Input() public noDataTemplate: TemplateRef<any>;
  @Input() public noRecordsFoundTemplate: TemplateRef<any>;
  @Input() public spaceAboveGridToolbar: number;
  @Output() public onAdd: EventEmitter<any> = new EventEmitter();
  @Output() public onRow: EventEmitter<any> = new EventEmitter();
  @Output() public onDblClick: EventEmitter<any> = new EventEmitter();
  @Output() public onActive: EventEmitter<any> = new EventEmitter();
  @Output() public onHeader: EventEmitter<any> = new EventEmitter();
  @Output() public onEdit: EventEmitter<any> = new EventEmitter();
  @Output() public onDelete: EventEmitter<any> = new EventEmitter();
  @Output() public onIcon: EventEmitter<any> = new EventEmitter();
  @Output() public onLink: EventEmitter<any> = new EventEmitter();
  @Output() public onSelect: EventEmitter<any> = new EventEmitter();
  @Output() public onQuickFilter: EventEmitter<any> = new EventEmitter();
  @Output() public onRowSelected: EventEmitter<any> = new EventEmitter();
  @Output() public onRowChecked: EventEmitter<any> = new EventEmitter();
  @Output() public onReady: EventEmitter<any> = new EventEmitter();
  @ViewChild(CdkVirtualScrollViewport, { static: true })
  public viewPort: CdkVirtualScrollViewport;
  //
  // Public Variables
  //
  public allCheckBox: Action;
  public search: Action;
  public gridSummary: GridSummary;
  public filterMessageBus: BehaviorSubject<Message> = new BehaviorSubject(
    new Message()
  );
  public gridHandler: Subject<any>;
  public shouldDisplayNoRecordsFound: boolean;
  public shouldDisplayRecords: boolean;
  public shouldDisplayNoData: boolean;
  public actionsOffset: number = 0;
  //
  // Private Variables
  //
  private _grid: Grid;
  private _prevent: boolean;
  private _timer: any;
  private _subscription: Subscription;

  /**
   * constructor()
   */
  constructor(private _changeDetector: ChangeDetectorRef) {
    super();
    this.bodyOffset = {
      height: 0,
      width: 0
    };
    //
    // Setup Grid Listener
    //
    this.listener = new Subject();
    //
    // Setup allCheckBox Checkbox
    //
    this.allCheckBox = new Action({
      onClick: (checked: boolean, emit: boolean = true) => {
        //
        // Set Checked GridRow
        //
        this._grid.setChecked(checked, undefined, undefined, true);
        this._grid.setHiddenCheckBoxRows(!checked, true);
        //
        // Get Summary
        //
        this.gridSummary.run(this._grid.data);

        setTimeout(() => {
          //
          // Process Rows Selected
          //
          if (Library.isDefined(this.onRowChecked)) {
            //
            // Emit the state of the selected and checked items
            //
            if (emit) {
              this.onRowChecked.emit(this.getState());
            }
          }
        }, Constant.SetTimoutDelay.Short);
      }
    });
    //
    // Setup Seach Icon
    //
    this.search = new Action({
      name: 'search',
      onClick: this._handleClearAllFilter.bind(this)
    });

    this.shouldDisplayNoData = false;
    this.shouldDisplayNoRecordsFound = false;
    this.shouldDisplayRecords = false;
  }

  /**
   * getTable()
   */
  public get grid() {
    return this._grid;
  }
  //
  // hasgridSummary()
  //
  public hasGridSummary() {
    return Library.isStringWithLength(this.gridSummary);
  }

  /**
   * getCheckedRows()
   */
  public getCheckedRows() {
    return this._grid.getChecked();
  }

  /**
   * getComponentType()
   */
  public getComponentType(): any {
    return Constant.Component;
  }

  /**
   * getDirectionType()
   */
  public getDirectionType(): any {
    return Constant.Direction;
  }

  //
  // handleMouseEnter()
  //
  public handleMouseEnter(row: GridRow) {
    if (
      this.schema.isSingleCheckBoxSelection() ||
      this.schema.isMultiCheckBoxSelection()
    ) {
      row.checkbox.hidden = false;
    }
  }

  //
  // handleMouseLeave()
  //
  public handleMouseLeave(row: GridRow) {
    row.checkbox.hidden = row.checkbox.checked ? false : true;
  }

  /**
   * handleHeader()
   */
  public handleHeader(column: GridColumn) {
    //
    // If we have a valid Sort GridColumn
    //
    if (!column.sort.disabled) {
      //
      // Flip the Direction
      //
      column.sort.toggleDirection();
      //
      // Set the Active GridColumn
      //
      this._grid.setActiveColumn(column);
      //
      // Set the Active GridColumn
      //
      this._grid.sort(column);
      //
      // Emit Header click event IFF Column is sortable
      //
      if (Library.isDefined(this.onHeader)) {
        this.onHeader.emit(column);
      }
      //
      // Setup Change Detection
      //
      this._changeDetector.detectChanges();
    }
  }
  /**
   * _handleClearAllFilter()
   */
  public _handleClearAllFilter(event: MouseEvent) {
    if (event) {
      //
      // Set to Search Icon
      //
      this.search.name = 'search';
      //
      // Remove columns
      //
      this._grid.clearFilters(Constant.FILTER_TYPE_INTERNAL);
      //
      // If the grid has an external filter then apply those filters
      //
      if (this._grid.hasFilterType(Constant.FILTER_TYPE_EXTERNAL)) {
        //
        // Apply Filters
        //
        this._applyFilter();
      } else {
        //
        // Clear the hidden Rows
        //
        this._grid.setHiddenRows(false);
      }
      //
      // Grid Filter Subject Pattern Used to interface with all the columns.
      //
      this.filterMessageBus.next(
        new Message({
          event: Constant.EventType.Notification,
          context: Constant.ContextType.ClearNotification,
          type: 'CLEAR'
        })
      );
      //
      // Count total number of hidden rows
      //
      this._updateGridSummaryAndDisplayProperties();
    }
  }
  /**
   * handleQuickFilter()
   */
  public handleQuickFilter(
    data: any,
    column: GridColumn,
    type: number = Constant.FILTER_TYPE_INTERNAL
  ) {
    //
    // Multiple Tokens
    //
    if (!Library.isArrayWithLength(data)) {
      data = Library.isStringWithLength(data)
        ? data.split(column.filterDelimeter)
        : [];
    }
    //
    // Set the Quick Filter Data
    //
    if (column.setQuickFilter(type, data)) {
      //
      // Apply Filters
      //
      this._applyFilter();
      //
      // Count total number of hidden rows
      //
      this._updateGridSummaryAndDisplayProperties();
    }
    //
    // Setup Change Detection
    //
    this._changeDetector.detectChanges();
  }

  //
  // apply filters
  //
  private _applyFilter() {
    //
    // filters
    //
    const filters: GridColumn[] = this._grid.columns.filter(col =>
      col.hasQuickFilter()
    );
    //
    // Clear the hidden Rows
    //
    this._grid.setHiddenRows(false);
    //
    // Reset the search icon
    //
    let count = this._grid.getColumnByFilterType(Constant.FILTER_TYPE_INTERNAL).length;
    this.search.name = count > 0 && filters.length > 0 ? 'close' : 'search';

    //
    // If we truly have filters then continue...
    //
    if (Library.isArrayWithLength(filters)) {
      //
      // For each row
      //
      filters.forEach((col: GridColumn) => {
        each(this._grid.data.filter(row => !row.hidden), row => {
          //
          // Set row.hidden property
          //
          row.hidden = col.hasCustomFilter()
            ? !col.onCustomFilter(row.data, col)
            : !GridFilterFunction.standard(get(row.data, col.field.name), col);
        });
      });
    }
  }

  //
  // handleAdd
  //
  public handleAdd($event: any) {
    if (Library.isDefined($event)) {
      if (Library.isDefined(this.onAdd)) {
        this.onAdd.emit($event);
      }
    }
  }
  //
  // handleRowChecked()
  //
  public handleRowChecked(row: any) {
    //
    // Get the GridRow
    //
    if (
      Library.isObject(row) &&
      (this.schema.isSingleCheckBoxSelection() ||
        this.schema.isMultiCheckBoxSelection())
    ) {
      if (this.schema.isSingleCheckBoxSelection()) {
        const checked = this._grid.getChecked();
        if (Library.isArrayWithLength(checked)) {
          if (checked[0].uid !== row.uid) {
            this._grid.setChecked(row);
          }
        } else {
          this._grid.setChecked(row);
        }
      }

      //
      // Get Summary
      //
      this.gridSummary.run(this._grid.data);

      if (Library.isDefined(this.onRowChecked)) {
        this.onRowChecked.emit(this.getState());
      }
    }
  }
  //
  // handleDblClick()
  //
  public handleDblClick(row: GridRow) {
    clearTimeout(this._timer);
    this._prevent = true;
    //
    // Event: OnSelect
    //
    if (Library.isDefined(this.onDblClick)) {
      this.onDblClick.emit(row);
    }
  }
  //
  // handleRowSelected
  //
  public handleRowSelected(row: GridRow) {
    this._timer = setTimeout(() => {
      if (!this._prevent) {
        if (
          Library.isObject(row) &&
          (this.schema.isSingleSelection() || this.schema.isMultiSelection())
        ) {
          if (this.schema.isSingleSelection()) {
            const selected = this._grid.getSelected();
            if (Library.isArrayWithLength(selected)) {
              if (selected[0].uid === row.uid) {
                row.selected = !row.selected;
              } else {
                this._grid.setSelected(row);
              }
            } else {
              this._grid.setSelected(row);
            }
          } else {
            row.selected = !row.selected;
          }

          //
          // Get Summary
          //
          this.gridSummary.run(this._grid.data);

          if (Library.isDefined(this.onRowSelected)) {
            this.onRowSelected.emit(this.getState());
          }
        }
      }
      this._prevent = false;
    }, Constant.SetTimoutDelay.Long);
  }
  //
  // handleCellChange
  //
  public handleCellChange(o: any) {
    //
    // If e have a valid object then...
    //
    if (Library.isObject(o)) {
    }
  }

  //
  // _handleClearExternalFilter
  //
  private _handleClearExternalFilter(filters: GridColumn[] = []) {
    //
    // Remove columns
    //
    this._grid.clearFilters(Constant.FILTER_TYPE_EXTERNAL, filters);
    //
    // Apply Filters
    //
    this._applyFilter();
    //
    // Grid Filter Subject Pattern Used to interface with all the columns.
    //
    if (filters.length === 0) {
      this.filterMessageBus.next(
        new Message({
          event: Constant.EventType.Notification,
          context: Constant.ContextType.ClearNotification,
          type: 'CLEAR'
        })
      );
    }
    //
    // Update Total
    //
    this._updateGridSummaryAndDisplayProperties();
  }

  //
  // handleEdit
  //
  public handleEdit($event: any) {
    if (Library.isDefined($event)) {
      if (Library.isDefined(this.onEdit)) {
        this.onEdit.emit($event);
      }
    }
  }
  //
  // handleDelete
  //
  public handleDelete($event: any) {
    if (Library.isDefined($event)) {
      if (Library.isDefined(this.onDelete)) {
        this.onDelete.emit($event);
      }
    }
  }
  //
  // handleIcon
  //
  public handleIcon($event: any) {
    if (Library.isDefined($event)) {
      if (Library.isDefined(this.onIcon)) {
        this.onIcon.emit($event);
      }
    }
  }
  //
  // handleLink
  //
  public handleLink($event: any) {
    if (Library.isDefined($event)) {
      if (Library.isDefined(this.onLink)) {
        this.onLink.emit($event);
      }
    }
  }
  //
  // handleSelect()
  //
  public handleSelect($event: any) {
    if (Library.isDefined($event)) {
      if (Library.isDefined(this.onSelect)) {
        this.onSelect.emit($event);
      }
    }
  }

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
            //
            // Map data to GridRows
            //
            this._grid.data = resp.data.map(
              (r: any) => new GridRow({ data: r })
            );
          } else {
            //
            // Map data to GridRows
            //
            this._grid.data = [];
          }
          //
          // Update Total
          //
          this._updateGridSummaryAndDisplayProperties();
          //
          // Setup Change Detection
          //
          this._changeDetector.detectChanges();
        });
      }
    }
  }
  //
  // ngAfterViewInit()
  //
  public ngAfterViewInit() {}
  //
  // ngAfterViewChecked()
  //
  public ngAfterViewChecked() {}
  //
  // ngOnInit()
  //
  public ngOnInit() {
    //
    // Setup Grid Summary
    //
    this.gridSummary = new GridSummary({
      subject: this.subject
    });
    //
    // Initialize Component
    //
    this._grid = new Grid(
      this.schema.columns.map(col => {
        return new GridColumn({
          ...col,
          onFilter: this.handleQuickFilter.bind(this)
        });
      })
    );
    //
    // If the schema contains user columns then apply them...
    //
    this._setupUserView();
    //
    // Setup Grid Options
    //
    this._grid.options = Object.assign({}, this.options);
    //
    // Initialize the Hidden Checkbox
    //
    this.allCheckBox.hidden = !this.schema.hasRowCheckSelection();

    /**
     * Right now, this just finds the first checkbox and we'll assume it's the one for the row checking.
     * However, this should eventually be refactored, as defined in https://jira.sdlc.lernender.com/browse/DB-4051
     *
     * SDL: We need to address this....
     */
    const checkboxColumn: GridColumn = this.grid.columns.find(
      (column: GridColumn): boolean => {
        return column.cellComponent.type === 'checkbox';
      }
    );
    //
    // SDL: We need to address this....
    //
    if (!Library.isNullOrUndefined(checkboxColumn)) {
      const checkboxStyle = this.getColumnStyle(checkboxColumn.align);
      this.allCheckBox.style = {
        ...checkboxColumn.style,
        ...checkboxStyle
      };
    }
    const actionsColumn: GridColumn = this.grid.columns.find(
      (column: GridColumn): boolean => {
        return column.field.name === 'actions';
      }
    );
    if (!Library.isNullOrUndefined(actionsColumn)) {
      this.actionsOffset = actionsColumn.width;
    }

    //
    // Get the Table Body Height
    //
    const toolbar = document.getElementsByClassName('ln-grid-toolbar')[0];
    if (toolbar) {
      // KWB: This should be configured on the row height,
      // not the bottom margin (currently configured in the CSS)
      const height = `calc(100vh - ${this.spaceAboveGridToolbar}px)`;
      this.grid.options.body = {
        style: {
          height
        }
      };
    }
    //
    // Initialize Listener
    //
    this._subscription = this.listener.subscribe((message: Message) => {
      switch (message.type.toUpperCase()) {
        case LnGridMessageType.CHECK_ALL:
        case LnGridMessageType.UNCHECK_ALL:
          this.allCheckBox.checked =
            message.type.toUpperCase() === LnGridMessageType.CHECK_ALL;
          this.allCheckBox.onClick(this.allCheckBox.checked, false);
          break;
        case LnGridMessageType.UNSELECT_ALL:
          this._grid.setSelected(false);
          break;
        case LnGridMessageType.FILTER:
          if (Library.isObject(message.content)) {
            if (!Library.isNullOrUndefined(message.content['data'])) {
              const index = this._grid.columns.findIndex(
                col => col.field.name === message.content['column'].field.name
              );
              if (index >= 0) {
                if (message.content['column']) {
                  //
                  // Designate the FilterType
                  //
                  this._grid.columns[index].filter.type |=
                    Constant.FILTER_TYPE_EXTERNAL;
                  //
                  // Filter Component
                  //
                  this.handleQuickFilter(
                    message.content['data'],
                    this._grid.columns[index],
                    Constant.FILTER_TYPE_EXTERNAL
                  );
                }
              }
            }
          }
          break;
        case LnGridMessageType.HYDRATE:
          if (Library.isObject(message.content)) {
            //
            // If we are selecting rows then...
            //
            if (
              Library.isArrayWithLength(
                (<ILnGridState>message.content).selected
              )
            ) {
              this._grid.setSelected(
                (<ILnGridState>message.content).selected,
                (<ILnGridState>message.content).context,
                (<ILnGridState>message.content).dataValueField
              );
              //
              // If selected array is empty, look for the row by provided dataValue, context and set that row as selected
              //
            } else if (
              Library.isStringWithLength(
                (<ILnGridState>message.content).dataValue
              )
            ) {
              const row = this._grid.find(
                message.content['dataValue'],
                message.content['context'],
                message.content['dataValueField']
              );
              if (Library.isDefined(row)) {
                this._grid.setSelected(row);
              }
            }
            //
            // If we are checking rows then....
            //
            if (
              Library.isArrayWithLength((<ILnGridState>message.content).checked)
            ) {
              this._grid.setChecked(
                (<ILnGridState>message.content).checked,
                (<ILnGridState>message.content).context,
                (<ILnGridState>message.content).dataValueField
              );
            }
            if (this.getState().checked.length > 0) {
              if (this.getState().checked.length === this.gridSummary.total) {
                this.allCheckBox.checked = true;
              } else {
                this.allCheckBox.checked = Constant.Checkbox.Deselect;
              }
            } else {
              this.allCheckBox.checked = false;
            }
          }
          break;
        case LnGridMessageType.SCROLL_TO:
          if (Library.isDefined(message.content)) {
            //
            // ScrollInto row based on the dataValueField
            //
            let row: GridRow;
            if (
              Library.isArrayWithLength(
                (<ILnGridState>message.content).selected
              )
            ) {
              row = (<ILnGridState>message.content).selected[0];
              //
              // If selected is empty, look up the row based on the provided data value ex. vin, stock_number
              //
            } else if (
              Library.isUndefined(row),
              Library.isStringWithLength(
                (<ILnGridState>message.content).dataValue
              )
            ) {
              row = this._grid.find(
                message.content['dataValue'],
                message.content['context'],
                message.content['dataValueField']
              );
            }
            //
            // If row is found scroll to it
            //
            if (Library.isDefined(row)) {
              // SDL: This is caused compilation errors...
              // let index = this._grid.indexOf(row, message.content['context'], message.content['dataValueField']);
              // this.viewPort.scrollToIndex(index);
            }
          }
          break;
        case LnGridMessageType.CLEAR:
          if (Library.isArrayWithLength(message.content)) {
            //
            // Create a list of columns with their corresponding tokens
            //
            const columns: GridColumn[] = message.content.map(item => {
              //
              // Set the tokens
              //
              item.column.filter.setTokens(Constant.FILTER_TYPE_EXTERNAL, item.tokens);
              //
              // Return the GridColumn
              //
              return item.column;
            });
            //
            // Clear the specified columns
            //
            this._handleClearExternalFilter(columns);
          }

          break;
        case LnGridMessageType.COLUMN_DEF:
          if (Library.isObject(message.content)) {
            if (Library.isArrayWithLength(message.content['columns'])) {
              this.schema.user.columns = JSON.parse(
                JSON.stringify(message.content['columns'])
              );
              this._setupUserView();
            }
          }
        case LnGridMessageType.DELETE:
          if (Library.isObject(message.content)) {
            // this._grid.remove(
            //   message.content,
            //   (<ILnGridState>message.content).context,
            //   (<ILnGridState>message.content).dataValueField,
            //   (<ILnGridState>message.content).dataValue
            // );
            // To update the grid records count
            this._updateGridSummaryAndDisplayProperties();
            this._changeDetector.detectChanges();
          }
          break;
      }
    });
  }
  private _setupUserView(): void {
    //
    // Use the User Columns to Order the Grid C olumns
    //
    if (this.schema.user.hasColumns()) {
      this._grid.columns.forEach(col => {
        let index = this.schema.user.columns.findIndex(
          (c: GridColumn) => c.field.name === col.field.name
        );
        col.hidden = !(index > -1);
        col.order = col.hidden ? 0 : (index += 1);
      });
      //
      // Sort Grid Columns via order property
      //
      this._grid.orderColumns();
    }
  }

  //
  // SDL: We need to remove this!!!!!
  //
  public getColumnStyle(align: string): object {
    switch (align) {
      case 'left':
        return {
          'justify-content': 'flex-start',
          'text-align': 'left'
        };
      case 'right':
        return {
          'justify-content': 'flex-end',
          'text-align': 'right'
        };
      case 'center':
      default:
        return {
          'justify-content': 'center',
          'text-align': 'center'
        };
    }
  }

  private _setShouldDisplayNoRecordsFound(): void {
    if (
      Library.isNullOrUndefined(this.grid) ||
      Library.isNullOrUndefined(this.gridSummary)
    ) {
      this.shouldDisplayNoRecordsFound = false;
    } else {
      this.shouldDisplayNoRecordsFound =
        this.grid.hasData() &&
        this.gridSummary.hasHiddenRows() &&
        !this.gridSummary.hasVisibleRows();
    }
  }

  private _setShouldDisplayRecords(): void {
    if (
      Library.isNullOrUndefined(this.grid) ||
      Library.isNullOrUndefined(this.gridSummary)
    ) {
      this.shouldDisplayRecords = false;
    } else {
      this.shouldDisplayRecords =
        this.grid.hasData() && this.gridSummary.hasVisibleRows();
    }
  }

  private _setShouldNoData(): void {
    if (Library.isNullOrUndefined(this.grid)) {
      this.shouldDisplayNoData = false;
    } else {
      this.shouldDisplayNoData = !this.grid.hasData();
    }
  }
  //
  // _updateGridSummaryAndDisplayProperties()
  //
  private _updateGridSummaryAndDisplayProperties() {
    this.gridSummary.run(this._grid.data);
    this._setShouldDisplayNoRecordsFound();
    this._setShouldDisplayRecords();
    this._setShouldNoData();
  }
  //
  // getState()
  //
  private getState(): ILnGridState {
    return {
      checked: this._grid.getChecked(),
      selected: this._grid.getSelected()
    };
  }
  //
  // ngOnDestroy()
  //
  public ngOnDestroy() {
    if (Library.isDefined(this._subscription)) {
      this._subscription.unsubscribe();
    }
  }
  //
  // trackById()
  //
  public trackById(_index: number, row: GridRow | GridColumn) {
    return row.uid;
  }

  // This is required the keep the column headers at the top of the virtual scoll
  public get inverseTranslation(): string {
    let value = '0px';
    if (this.viewPort && this.viewPort['_renderedContentTransform']) {
      let sindex = this.viewPort['_renderedContentTransform'].indexOf('(');
      let eindex = this.viewPort['_renderedContentTransform'].indexOf(')');
      value =
        '-' +
        this.viewPort['_renderedContentTransform'].substring(
          sindex + 1,
          eindex
        );
    }
    return value;
  }
}
