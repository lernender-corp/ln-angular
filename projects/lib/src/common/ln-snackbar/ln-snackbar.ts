import {
  Component,
  Input,
  OnDestroy,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import { Subscription, BehaviorSubject } from 'rxjs';
import { Library, Message } from '@lernender/core';
import { LnSnackBarConfig } from './ln-snackbar-config';
import { SNACKBAR, POSITION, ANIMATIONS } from './ln-snackbar-const';

@Component({
  selector: 'ln-snackbar',
  templateUrl: 'ln-snackbar.html',
  styleUrls: ['ln-snackbar.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LnSnackBar implements OnInit, OnDestroy {
  @Input() public disabled: boolean;
  @Input() public hidden: boolean;
  @Input() public style: object;
  @Input() public config: LnSnackBarConfig;
  @Input() public announcement: BehaviorSubject<Message>;
  public showIt: boolean;
  //
  // Subscriptions
  //
  private _subscription: Subscription[];

  constructor() {
    this._subscription = [];
    this.config = new LnSnackBarConfig();
    this.style = this._generateCssByConfig();
    this.showIt = false;
  }
  //
  // ngOnInit()
  //
  public ngOnInit() {
    if (Library.isDefined(this.announcement)) {
      this._subscription.push(
        this.announcement.subscribe((message: Message) => {
          if (Library.isDefined(message)) {
            this.style = {...this._generateCssByConfig(), ...this.style};
            this.config = {...this.config, ...message.content};
            this._render();
          }
        })
      );
    }
  }
  //
  // ngOnDestroy()
  //
  public ngOnDestroy() {
    if (Library.isArrayWithLength(this._subscription)) {
      this._subscription.forEach(s => s.unsubscribe());
    }
  }
  //
  // opens the snackbar with the message
  //
  public open(message: Message, config?: LnSnackBarConfig): void {
    this.config = { ...this.config, ...config };
    this.announcement.next(message);
  }
  //
  // closes the already open snackbar
  //
  public dismiss(): void {
    this._remove();
  }
  //
  // whether snackbar is open
  //
  public isOpen(): boolean {
    return this.showIt;
  }
  //
  // private method for closing the snackbar
  //
  private _remove(): void {
    // generate css and wait for animation to happen before closing
    this.style = {...this._generateCssByConfig(), ...this.style};
    setTimeout(() => {
      this.showIt = !!SNACKBAR.CLOSE;
    }, 100);
  }
  //
  // renders and removes the snackbar based on config.duration
  //
  private _render(): void {
    if (Library.isDefined(this.config)) {
      setTimeout(() => {
        this._remove();
      }, this.config.duration);
      this.showIt = !!SNACKBAR.OPEN;
    }
  }
  //
  // generates css object based on the default or passed configuration
  //
  private _generateCssByConfig(): object {
    if (Library.isDefined(this.config)) {
      // vertical position of the snackbar
      const yposition = { [this.config.verticalPosition]: '0px' };
      // generate animation based on the config
      const animation = this._generateAnimation(
        this.config.horizontalPosition,
        this.config.verticalPosition
      );
      switch (this.config.horizontalPosition) {
        case POSITION.LEFT:
        case POSITION.START:
          return {
            left: '20px',
            animation,
            ...yposition
          };
        case POSITION.RIGHT:
        case POSITION.END:
          return {
            right: '20px',
            animation,
            ...yposition
          };
        default:
          return {
            left: '50%',
            animation,
            ...yposition
          };
      }
    }
  }
  //
  // generate animation direction based on the x/y coordinates
  //
  private _generateAnimation(xcord: string, ycord: string): string {
    // if position is center animation has different starting and ending position
    if (xcord === POSITION.CENTER) {
      // if position is top flips the animation to slide in or out
      if (ycord === POSITION.TOP) {
        // if snackbar is open flips the animation to slide in or out
        return this.isOpen()
          ? ANIMATIONS.SLIDETOPCENTER
          : ANIMATIONS.SLIDEBOTTOMCENTER;
      } else {
        return this.isOpen()
          ? ANIMATIONS.SLIDEBOTTOMCENTER
          : ANIMATIONS.SLIDETOPCENTER;
      }
      // catches all the other cases other than position center
    } else {
      if (ycord === POSITION.TOP) {
        return this.isOpen() ? ANIMATIONS.SLIDETOP : ANIMATIONS.SLIDEBOTTOM;
      } else {
        return this.isOpen() ? ANIMATIONS.SLIDEBOTTOM : ANIMATIONS.SLIDETOP;
      }
    }
  }
}
