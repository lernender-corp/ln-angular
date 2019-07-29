import { Component, Input, OnDestroy, ViewEncapsulation } from '@angular/core';
import { Guid, Library } from '@lernender/core';
import { Observable, Subscription } from 'rxjs';

@Component({
  moduleId: module.id,
  selector: 'cdk-base',
  templateUrl: './cdk-base.html',
  encapsulation: ViewEncapsulation.None
})
export class CdkBase implements OnDestroy {
  @Input() public disabled: boolean;
  @Input() public hidden: boolean;
  @Input() public style: object;
  @Input('data') public dataEventHandler: Observable<any>;

  public uid: string;
  public dataEventSubscription: Subscription;

  constructor() {
    this.uid = Guid.NEW();
    this.disabled = false;
    this.hidden = false;
    this.style = {};
  }

  public hasStyles() {
    return Library.isObject(this.style);
  }

  public hasDataEventSubscription() {
    return Library.isDefined(this.dataEventSubscription);
  }

  public hasDataEventHandler() {
    return Library.isDefined(this.dataEventHandler);
  }

  /**
   * ngOnDestroy()
   */
  public ngOnDestroy() {
    if (this.hasDataEventSubscription()) {
      this.dataEventSubscription.unsubscribe();
    }
  }

  /**
   * registerDataEventHandler()
   * @param cb
   */
  protected registerDataEventHandler(cb: any) {
    if (this.hasDataEventHandler()) {
      if (this.hasDataEventSubscription()) {
        this.dataEventSubscription.unsubscribe();
      }
      if (this.hasDataEventHandler()) {
        if (Library.isFunction(this.dataEventHandler.subscribe)) {
          this.dataEventSubscription = this.dataEventHandler.subscribe(
            event => {
              if (Library.isObject(event)) {
                if (Library.isFunction(cb)) {
                  cb(event);
                }
              }
            }
          );
        }
      }
    }
  }
}
