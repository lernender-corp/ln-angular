import { Library, TableRow, TableColumn, TableField } from '@lernender/core';
import { Container } from '../generic/container';
import { find, filter } from 'lodash-es';

export class Table extends Container<TableRow> {
  //
  // Public Variables
  //
  public columns: TableColumn[];

  constructor();
  constructor(columns: TableColumn[]);
  constructor(
    columns?: TableColumn[]
  ) {
    super();
    this.columns = columns || [];
  }

  //
  // colResize()
  //
  // NOTE: Must be called after ngViewInit()
  //
  public colResize(className: string = 'tm-column-resize', color: string = '#cdcdcd') {
    const _table = document.getElementById(this.uid);
    if (Library.isDefined(_table)) {
      //
      // Get Height of Table
      //
      const _height = _table.offsetHeight;
      //
      // Set Overflow to Hidden
      //
      _table.style.overflow = 'hidden';
      //
      // Get the first row of the table
      //
      const _row = _table.getElementsByTagName('tr')[0];
      const _columns = _row ? _row.children : undefined;
      if (_columns) {
        //
        // Create a div for each of the columns
        //
// tslint:disable-next-line: prefer-for-of
        for (let i = 0; i < _columns.length; i++) {
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
  //
  // hsColumns()
  //
  public hasColumns() {
    return Library.isArrayWithLength(this.columns);
  }
  //
  // Get column by Field Name
  //
  public getColumnByField(field: TableField) {
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
  public sort(column: TableColumn) {
    if (!column.sort.disabled && this.hasData()) {
      this.data.sort((a, b) => {
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
      });
    }
  }
  //
  // Set Active Column
  //
  public setActiveColumn(column) {
    if (Library.isObject(column)) {
      if (column instanceof TableColumn) {
        this.columns.forEach(col => {
          col.sort.active = column.uid === col.uid;
        });
      }
    }
  }
  //
  // _createColumnResizeBar()
  //
  private _createColumnResizeBar(height, className) {
    const bar = document.createElement('div');
    if (Library.isStringWithLength(className)) {
      bar.classList.add(className);
    } else {
      bar.style.top = '0';
      bar.style.right = '0';
      bar.style.width = '4px';
      bar.style.position = 'absolute';
      bar.style.cursor = 'col-resize';
      bar.style.userSelect = 'none';
    }
    //
    // Add Height of Table
    //
    bar.style.height = height + 'px';
    //
    // Return Bar
    //
    return bar;
  }
  //
  // _createColumnResizeListeners()
  //
  private _createColumnResizeListeners(bar: HTMLDivElement, color: string) {
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
        if (next) {
          next.style.width = nextWidth - diffX + 'px';
        }
        current.style.width = currentWidth + diffX + 'px';
      }
    });

    document.addEventListener('mouseup', () => {
      current = undefined;
      next = undefined;
      pageX = undefined;
      nextWidth = undefined;
      currentWidth = undefined;
    });
  }

  private _paddingDiff(col) {
    if (this._getStyleVal(col, 'box-sizing') === 'border-box') {
      return 0;
    }

    const padLeft = this._getStyleVal(col, 'padding-left');
    const padRight = this._getStyleVal(col, 'padding-right');
    return parseInt(padLeft, 4) + parseInt(padRight, 4);
  }

  private _getStyleVal(elm, css) {
    return window.getComputedStyle(elm, null).getPropertyValue(css);
  }
}
