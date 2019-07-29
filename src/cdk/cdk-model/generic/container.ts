import { filter, find, each } from 'lodash-es';
import { Library, Guid, GridGeneric, GridSummary, PageSet } from '@lernender/core';

/**
 * Container()
 */
export class Container<T extends GridGeneric> {
  //
  // Public Variables
  //
  public uid: string;
  public pageSet: PageSet;
  //
  // Private Variables
  //
  private _data: T[];

  /**
   * Constructor
   */
  constructor() {
    //
    // Create a unique identifier for the card
    //
    this.uid = Guid.NEW();
    this._data = [];
  }

  public get data() {
    return this._data;
  }

  public set data(items: T[]) {
    this._data.length = 0;
    if (Library.isArrayWithLength(items)) {
      this._data = [...items];
    }
  }

  public get rows() {
    return this._data.filter(row => !row.hidden);
  }

  //
  // length
  //
  public get length() {
    return this._data.length;
  }
  //
  // hasData()
  //
  public hasData() {
    return this.length > 0;
  }
  //
  // setHiddenRows()
  //
  public setHiddenRows(hidden: boolean = true) {
    this._data.forEach(r => (r.hidden = hidden));
  }
  //
  // setRowHidden()
  //
  public getHiddenRows(hidden: boolean = true) {
    return this._data.forEach(r => r.hidden === hidden);
  }

  //
  // setActive()
  //
  public setActive(obj: T, dataValueField: string = 'uid') {
    //
    // If we have a valid object
    //
    if (Library.isObject(obj)) {
      this._data.forEach(
        r => (r.active = r[dataValueField] === obj[dataValueField])
      );
    }
  }
  //
  // getActive()
  //
  public getActive() {
    //
    // If we have a valid object
    //
    return this._data.find(r => r.active);
  }
  //
  // Card Options
  //
  public setOption(obj?: T) {
    each(this._data, r => {
      if (Library.isDefined(r)) {
        r.canActivate = obj.canActivate;
        r.canCheck = obj.canCheck;
        r.canDelete = obj.canDelete;
      }
    });
  }

  //
  // setHiddenCheckBoxRows()
  //
  public setHiddenCheckBoxRows(
    hidden: boolean = true,
    onlyVisibleRows: boolean = false
  ) {
    return this._data.forEach(r => {
      r.checkbox.hidden = onlyVisibleRows
        ? !r.hidden
          ? hidden
          : true
        : hidden;
    });
  }
  //
  // getHiddenCheckBoxRows()
  //
  public getHiddenCheckBoxRows(hidden: boolean = true) {
    return this._data.filter(r => {
      return r.checkbox.hidden === hidden;
    });
  }

  /**
   * setChecked()
   */
  public setChecked(
    o: T | boolean | T[],
    context: string = 'row',
    dataValueField: string = 'uid',
    onlyVisibleRows: boolean = false
  ) {
    const isRow = context === 'row';
    //
    // If we have a valid object
    //
    if (Library.isArray(o)) {
      // Based on the context and dataValueField retrieve id's to check from the list
      const checkedRowsIds = (<T[]>o).map(row =>
        isRow ? row[dataValueField] : row[context][dataValueField]
      );
      this._data.forEach(r => {
        // If context is row search one level up
        if (isRow) {
          r.checkbox.checked = checkedRowsIds.includes(r[dataValueField]);
        } else {
          r.checkbox.checked = checkedRowsIds.includes(
            r[context][dataValueField]
          );
        }
        r.checked = r.checkbox.checked;
        r.checkbox.hidden = !r.checked;
      });
    } else if (Library.isObject(o)) {
      //
      // Check 1 and only 1 row!!
      //
      this._data.forEach(r => {
        if (isRow) {
          r.checkbox.checked = r[dataValueField] === (<T>o)[dataValueField];
        } else {
          r.checkbox.checked =
            r[context][dataValueField] === (<T>o)[context][dataValueField];
        }
        r.checked = r.checkbox.checked;
        r.checkbox.hidden = !r.checked;
      });
    } else if (Library.isBoolean(o)) {
      //
      // Check 1 or more rows (ie. visible rows -or- rows in general)
      //
      this._data.forEach(r => {
        r.checkbox.checked = onlyVisibleRows
          ? !r.hidden
            ? <boolean>o
            : false
          : <boolean>o;
        r.checked = r.checkbox.checked;
      });
    }
  }
  /**
   * getChecked()
   */
  public getChecked() {
    //
    // If we have a valid object
    //
    return this._data.filter(r => {
      return r.checkbox.checked;
    });
  }

  /**
   * setSelected()
   */
  public setSelected(
    o: T | boolean | T[],
    context: string = 'row',
    dataValueField: string = 'uid'
  ) {
    //
    // If we have a valid object
    //
    const isRow = context === 'row';
    if (Library.isArray(o)) {
      const selectedRowsIds = (<T[]>o).map(row =>
        isRow ? row[dataValueField] : row[context][dataValueField]
      );
      this._data.forEach(r => {
        if (isRow) {
          r.selected = selectedRowsIds.includes(r[dataValueField]);
        } else {
          r.selected =
            r[context][dataValueField] === (<T>o)[0][context][dataValueField];
        }
      });
    } else if (Library.isObject(o)) {
      this._data.forEach(r => {
        if (isRow) {
          r.selected = r[dataValueField] === (<T>o)[dataValueField];
        } else {
          r.selected =
            r[context][dataValueField] === (<T>o)[context][dataValueField];
        }
      });
    } else if (Library.isBoolean(o)) {
      this._data.forEach(r => {
        r.selected = <boolean>o;
      });
    }
  }
  /**
   * getSelected()
   */
  public getSelected() {
    //
    // If we have a valid object
    //
    return this._data.filter(r => {
      return r.selected;
    });
  }

  /**
   * counts()
   */
  public counts(): GridSummary {
    return new GridSummary().run(this._data);
  }

  /**
   * isChecked()
   */
  public isChecked(obj: T, dataValueField: string = 'uid') {
    //
    // If we have a valid object
    //
    if (Library.isObject(obj)) {
      const item = find(
        this._data,
        r => r[dataValueField] === obj[dataValueField]
      );
      if (Library.isObject(item)) {
        return item.checked;
      }
    }

    return false;
  }

  /**
   * find()
   */
  public find(
    token: string,
    context: string = 'row',
    dataValueField: string = 'uid'
  ) {
    const isRow = context === 'row';
    if (Library.isStringWithLength(token)) {
      const list = filter(this._data, o => {
        return isRow
          ? o[dataValueField] === token
          : o[context][dataValueField] === token;
      });
      return list.length === 0 ? undefined : list[0];
    }
    return;
  }

  public remove(
    obj: T | T[],
    context: string = 'row',
    dataValueField: string = 'uid'
  ) {
    const data: any = this._data;
    const isRow = context === 'row';
    if (Library.isArray(obj)) {
      if (isRow) {
        for (let idx = 0; idx < Object.keys(obj).length; idx++) {
          const index = this._data.findIndex(
            r => r.data[dataValueField] === obj[idx][dataValueField]
          );
          this._data.splice(index, 1);
        }
      }
    } else if (Library.isObject(obj)) {
      if (isRow) {
        for (let idx = 0; idx < this._data.length; idx++) {
          if (this._data[idx].data[dataValueField] === obj[dataValueField]) {
            this._data.splice(idx, 1);
          }
        }
      }
    }
    let finalData = data.filter(Boolean);
    this._data = finalData;
  }
  public indexOf(
    obj: T,
    context: string = 'row',
    dataValueField: string = 'uid'
  ) {
    for (let i = 0; i < this._data.length; i++) {
      if (
        this._data[i][context][dataValueField] === obj[context][dataValueField]
      ) {
        return i;
      }
    }
    return -1;
  }
}
