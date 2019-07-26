import {IPageInfo} from './page';

export interface ChangeEvent extends IPageInfo {
  start: number;
  end: number;
}
