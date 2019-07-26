import { Library, Constant } from '@lernender/core';
import { POSITION } from './ln-snackbar-const';

/** Possible values for horizontalPosition on LnSnackBarConfig. */
export declare type LnSnackBarHorizontalPosition =
  | 'start'
  | 'center'
  | 'end'
  | 'left'
  | 'right';
/** Possible values for verticalPosition on LnSnackBarConfig. */
export declare type LnSnackBarVerticalPosition = 'top' | 'bottom';
/**
 * Configuration used when opening a snack-bar.
 */
export class LnSnackBarConfig {
  closeBtn?: boolean;
  /** The length of time in milliseconds to wait before automatically dismissing the snack bar. */
  duration?: number;
  /** The horizontal position to place the snack bar. */
  horizontalPosition?: LnSnackBarHorizontalPosition;
  /** The vertical position to place the snack bar. */
  verticalPosition?: LnSnackBarVerticalPosition;
  constructor(options?: any) {
    this.closeBtn = Library.init(options, 'closeBtn', true);
    this.duration = Library.init(options, 'duration', Constant.NotificationTimeout.Standard);
    this.horizontalPosition = Library.init(
      options,
      'horizontalPosition',
      POSITION.CENTER
    );
    this.verticalPosition = Library.init(
      options,
      'verticalPosition',
      POSITION.BOTTOM
    );
  }
}
