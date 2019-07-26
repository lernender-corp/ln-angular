import {IPageInfo} from './page';

export interface IViewport extends IPageInfo {
  padding: number;
  scrollLength: number;
  scrollScaleFactor: number;
}
