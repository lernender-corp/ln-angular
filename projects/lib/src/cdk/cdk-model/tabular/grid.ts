import {
  Constant,
  Library,
  GridRow,
  GridColumn,
  GridOption
} from '@lernender/core';
import { Container } from '../generic/container';
import { find, filter } from 'lodash-es';

export class Grid extends Container<GridRow> {
  //
  // Public Variables
  //
  public columns: GridColumn[];
  public options: GridOption;

  constructor();
  constructor(columns: GridColumn[]);
  constructor(columns: GridColumn[], options: object);
  constructor(columns?: GridColumn[], options: GridOption = new GridOption()) {
    super();
    this.columns = columns || [];
    this.options = options;
  }

  //
  // colResize()
  //
  // NOTE: Must be called after ngViewInit()
  //
  public colResize(
    className: string = 'tm-column-resize',
    color: string = '#cc0000'
  ) {
    const _container = document.getElementById(this.uid);
    if (Library.isDefined(_container)) {
      //
      // Get Height of Table
      //
      const _height = _container.offsetHeight;
      //
      // Get the first row of the table
      //
      const _row = _container.getElementsByTagName('tr')[0];
      const _columns = _row ? _row.children : undefined;
      if (_columns) {
        //
        // Create a div for each of the columns
        //
        // tslint:disable-next-line: prefer-for-of
        for (let i = 0; i < _columns.length; i++) {
          if (_columns[i].classList.contains('resizeable')) {
            const bar = this._createColumnResizeBar(_height, className);
            //
            // Add resize-bar to each column
            //
            _columns[i].appendChild(bar);
            //
            // Set the position to relative
            //
            (_columns[i] as HTMLElement).style.position = 'relative';
            //
            // Add Listeners
            //
            this._createColumnResizeListeners(bar, color);
          }
        }
      }
    }
  }
  //
  // hsColumns()
  //
  public hasColumns() {
    return Library.isArrayWithLength(this.columns);
  }
  //
  // hasFilterType()
  //
  public hasFilterType(type: number = 0) {
    return type === 0 ? false : this.getColumnByFilterType(type).length > 0;
  }

  //
  // clearFilters()
  //
  public clearFilters(type: number = 0, externalFilters: GridColumn[] = []) {
    //
    // Clear All Filters
    //
    if (type === 0) {
      this.columns.forEach(col => {
        col.filter.clear(type);
        col.filter.type = Constant.FILTER_TYPE_NONE;
      });
    } else {
      //
      // Clear Internal Columns Filters
      //
      if ((type & Constant.FILTER_TYPE_INTERNAL) === Constant.FILTER_TYPE_INTERNAL) {
        this.getColumnByFilterType(Constant.FILTER_TYPE_INTERNAL).forEach(col => {
          col.filter.clear(type);
          col.filter.type &= ~(Constant.FILTER_TYPE_INTERNAL);
        });
      }
      //
      // Clear External Columns Filters
      //
      if ((type & Constant.FILTER_TYPE_EXTERNAL) === Constant.FILTER_TYPE_EXTERNAL) {
        externalFilters.forEach(col => {
          const idx = this.columns.findIndex(c => c.field.name === col.field.name);
          if (idx > -1) {
            this.columns[idx].filter.clear(type, col.filter.tokens);
            this.columns[idx].filter.type &= ~(Constant.FILTER_TYPE_EXTERNAL);
          }
        });
      }
    }
  }

  //
  // getColumnByFilterType()
  //
  public getColumnByFilterType(type: number = 0) {
    return this.columns.filter(col => {
      return (col.filter.type & type) === type;
    });
  }
  //
  // Get column by Field Name
  //
  public getColumnByField(field) {
    return find(this.columns, c => {
      return c.field.name === field.name;
    });
  }
  //
  // Get column by Type
  //
  public getColumnByType(type) {
    if (Library.isDefined(type)) {
      return filter(this.columns, o => {
        return o.type === type;
      });
    }
    return [];
  }
  //
  // sort
  //
  public sort(column: GridColumn) {
    if (!column.sort.disabled && this.hasData()) {
      const sortFunc = (a, b) => {
        const x = Library.parseObject(a.data, column.field.name);
        const y = Library.parseObject(b.data, column.field.name);

        if (column.sort.isAscending()) {
          if (x < y) {
            return -1;
          }
          if (x > y) {
            return 1;
          }
        } else {
          if (x < y) {
            return 1;
          }
          if (x > y) {
            return -1;
          }
        }
        return 0;
      };
      //
      // Refresh List
      //
      this.data = [...this.data.sort(sortFunc)];
    }
  }
  //
  // setColumns
  //
  public setColumns(columns: GridColumn[] = []): void {
    //
    // Filter/Hide collumns that are not in this list of columns
    //
    if (Library.isArrayWithLength(columns)) {
      let nIdx = 1;
      this.columns.forEach(col => {
        col.hidden =
          columns.findIndex(
            (c: GridColumn) => c.field.name === col.field.name
          ) === -1;
        col.order = nIdx++;
      });
    }
    //
    // Order Column
    //
    this.orderColumns();
  }
  //
  // Order Columns
  //
  public orderColumns(
    fnc: any = (a: GridColumn, b: GridColumn) => a.order - b.order
  ): void {
    this.columns.sort(fnc);
  }
  //
  // Set Active Column
  //
  public setActiveColumn(column) {
    if (Library.isObject(column)) {
      if (column instanceof GridColumn) {
        this.columns.forEach(col => {
          col.sort.active = column.uid === col.uid;
        });
      }
    }
  }
  //
  // setColumn()
  //
  public setColumn(columns: GridColumn[]): void {
    //
    // Loop through existing columns
    //
    if (Library.isArrayWithLength(columns)) {
      this.columns.forEach(col => {
        let index = columns.findIndex(
          (c: GridColumn) => c.field.name === col.field.name
        );
        col.hidden = !(index > -1);
        col.order = col.hidden ? 0 : (index += 1);
      });
      //
      // Order Column
      //
      this.orderColumns();
    }
  }
  //
  // _createColumnResizeBar()
  //
  private _createColumnResizeBar(height, className) {
    const bar = document.createElement('div');
    if (Library.isStringWithLength(className)) {
      bar.classList.add(className);
    }
    //
    // Add Height of Table
    //
    bar.style.height = `100%`;
    if (Library.hasOwnProperty(this.options.body, 'style')) {
      if (Library.hasOwnProperty(this.options.body.style, 'height')) {
        bar.style.height = `${this.options.body.style.height}px`;
      }
    }
    //
    // Return Bar
    //
    return bar;
  }
  //
  // _createColumnResizeListeners()
  //
  private _createColumnResizeListeners(bar: HTMLDivElement, color: string) {
    let currentMaxWidth;
    let currentMinWidth;
    let pageX;
    let current;
    let next;
    let currentWidth;
    let nextWidth;

    //
    // Add MouseDown Event Listener
    //
    bar.addEventListener('mousedown', e => {
      current = e.target['parentElement'];
      next = current.nextElementSibling;
      pageX = e.pageX;

      const padding = this._paddingDiff(current);

      currentWidth = current.offsetWidth - padding;

      currentMaxWidth =
        current.style.maxWidth.length === 0
          ? -1
          : parseInt(current.style.maxWidth.replace('px', ''), 10);

      currentMinWidth =
        current.style.minWidth.length === 0
          ? -1
          : parseInt(current.style.minWidth.replace('px', ''), 10);

      if (next) {
        nextWidth = next.offsetWidth - padding;
      }
    });
    //
    // Add MouseOver Event Listener
    //
    bar.addEventListener('mouseover', e => {
      (e.target as HTMLElement).style.borderRight = `2px solid ${color}`;
    });
    //
    // Add MouseOut Event Listener
    //
    bar.addEventListener('mouseout', e => {
      (e.target as HTMLElement).style.borderRight = '';
    });
    //
    // Add MouseMove Event Listener
    //
    document.addEventListener('mousemove', e => {
      if (current) {
        const diffX = e.pageX - pageX;
        const width = currentWidth + diffX;

        if (width < currentMaxWidth || currentMaxWidth === -1) {
          if (next) {
            next.style.width = nextWidth - diffX + 'px';
            next.style.minWidth = next.style.width;
          }
          current.style.width = width + 'px';
          current.style.minWidth = current.style.width;
        }
      }
    });

    document.addEventListener('mouseup', () => {
      current = undefined;
      next = undefined;
      pageX = undefined;
      // nextWidth = undefined;
      currentWidth = undefined;
    });
  }
  //
  // _paddingDiff()
  //
  private _paddingDiff(col) {
    if (this._getStyleVal(col, 'box-sizing') === 'border-box') {
      return 0;
    }

    const padLeft = this._getStyleVal(col, 'padding-left');
    const padRight = this._getStyleVal(col, 'padding-right');
    return parseInt(padLeft, 4) + parseInt(padRight, 4);
  }
  //
  // _getStyleVal()
  //
  private _getStyleVal(elm, css) {
    return window.getComputedStyle(elm, null).getPropertyValue(css);
  }
}
