import { Directive, EventEmitter, HostListener, Input, OnDestroy, OnInit, Output } from '@angular/core';

import { CdkClipboardService } from '../../cdk';

@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[tmClipboard]'
})
export class LnClipboardDirective implements OnInit, OnDestroy {
    // tslint:disable-next-line:no-input-rename
    @Input('tmClipboard')
    public targetElm: HTMLInputElement;
    @Input()
    public container: HTMLInputElement;

    @Input()
    public cbContent: string;

    @Output()
    public cbOnSuccess: EventEmitter<any> = new EventEmitter<any>();

    @Output()
    public cbOnError: EventEmitter<any> = new EventEmitter<any>();
    constructor(private clipboardSrv: CdkClipboardService) {}

    // tslint:disable-next-line:no-empty
    public ngOnInit() {}

    public ngOnDestroy() {
        this.clipboardSrv.destroy(this.container);
    }

    @HostListener('click', ['$event.target'])
    public onClick(event: Event) {
        if (!this.clipboardSrv.isSupported) {
            this.handleResult(false, undefined, event);
        } else if (this.targetElm && this.clipboardSrv.isTargetValid(this.targetElm)) {
            this.handleResult(this.clipboardSrv.copyFromInputElement(this.targetElm), this.targetElm.value, event);
        } else if (this.cbContent) {
            this.handleResult(this.clipboardSrv.copyFromContent(this.cbContent, this.container), this.cbContent, event);
        }
    }

    /**
     * Fires an event based on the copy operation result.
     * @param succeeded
     */
    private handleResult(succeeded: boolean, copiedContent: string | undefined, event: Event) {
        if (succeeded) {
            this.cbOnSuccess.emit({ isSuccess: true, content: copiedContent, event: event });
        } else {
            this.cbOnError.emit({ isSuccess: false, event: event });
        }
    }
}
