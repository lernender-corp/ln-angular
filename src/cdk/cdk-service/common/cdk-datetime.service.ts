import { Injectable } from '@angular/core';
import { Library } from '@lernender/core';
import { isDate } from 'lodash-es';

@Injectable()
export class CdkDateTimeService {
  /**
   * Previouis()
   */
  public Previous() {
    return {
      Year: date => {
        const _date = Library.isString(date) ? new Date(date) : date;
        if (isDate(_date)) {
          _date.setFullYear(_date.getFullYear() - 1);
          return _date;
        }
        return _date;
      },
      Month: date => {
        const _date = Library.isString(date) ? new Date(date) : date;
        if (isDate(_date)) {
          if (_date.getMonth() === 0) {
            return new Date(_date.getFullYear() - 1, 11);
          }
          return new Date(_date.getFullYear(), _date.getMonth() - 1);
        }
        return _date;
      }
    };
  }

  /**
   * Next()
   */
  public Next() {
    return {
      Year: date => {
        const _date = Library.isString(date) ? new Date(date) : date;
        if (isDate(_date)) {
          _date.setFullYear(_date.getFullYear() + 1);
          return _date;
        }
        return _date;
      },
      Month: date => {
        const _date = Library.isString(date) ? new Date(date) : date;
        if (isDate(_date)) {
          if (_date.getMonth() === 11) {
            return new Date(_date.getFullYear() + 1, 0);
          }
          return new Date(_date.getFullYear(), _date.getMonth() + 1);
        }
        return _date;
      }
    };
  }

  /**
   * Equal()
   */
  public Equal() {
    return {
      Month: (x, y) => {
        const date1 = Library.isString(x) ? new Date(x) : x;
        const date2 = Library.isString(y) ? new Date(y) : y;
        if (isDate(date1) && isDate(date2)) {
          return (
            date1.getFullYear() === date2.getFullYear() &&
            date1.getMonth() === date2.getMonth()
          );
        }
        return false;
      },
      Day: (x, y) => {
        const date1 = Library.isString(x) ? new Date(x) : x;
        const date2 = Library.isString(y) ? new Date(y) : y;
        if (isDate(date1) && isDate(date2)) {
          return (
            date1.getFullYear() === date2.getFullYear() &&
            date1.getMonth() === date2.getMonth() &&
            date1.getDate() === date2.getDate()
          );
        }
        return false;
      }
    };
  }
}
