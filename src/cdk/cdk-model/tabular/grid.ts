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
}
