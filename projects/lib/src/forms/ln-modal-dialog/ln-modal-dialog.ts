import { Component, Input, TemplateRef, SimpleChange, OnInit, OnChanges } from '@angular/core';
import { CdkBase, CdkMessageService } from '../../cdk';
import { Action, Library } from '@lernender/core';

@Component({
  moduleId: module.id,
  selector: 'ln-modal-dialog',
  templateUrl: './ln-modal-dialog.html',
  styleUrls: ['./ln-modal-dialog.scss']
})

export class LnModalDialog extends CdkBase implements OnInit, OnChanges {
  @Input('template') template: TemplateRef<any>;
  @Input() data: any;
  @Input() actions: Action[];
  @Input() close: Action;
  @Input() removeOverlay: boolean;

  /**
   * Ioen()
   */
  public Open() {
    this._messageService.dispatch({
      action: 'open'
    });
  }

  /**
   * Close()
   */
  public Close() {
    this._messageService.dispatch({
      action: 'close'
    });
  }

  public handleContainer($event: MouseEvent) {
    $event.preventDefault();
    $event.stopPropagation();
  }
  /**
   * OnCancel()
   */
  public OnCancel($event: KeyboardEvent) {
    $event.preventDefault();
    $event.stopPropagation();
  }

  /**
   * OnAction()
   */
  public OnAction(item: Action) {
    item.onClick();
    setTimeout(() => {
      this.Close();
    }, 10);
  }

  /**
   * ngOnInit()
   */
  public ngOnInit() {
    //
    // Set Default Height
    //
    // this.style = Object.assign({}, { height: '300px', width: '350px' }, this.style);
    this.style = {height: '300px', width: '350px', ...this.style};
  }

  /**
   * ngAfterViewInit()
   */
  public ngAfterViewInit() {
  }

    //
  // ngOnChanges
  //
  public ngOnChanges(changes: { [propName: string]: SimpleChange }) {
    //
    // Initialize Component
    //
      if (Library.isDefined(changes['data'])) {
      if (Library.isDefined(changes['data'].currentValue)) {
      }
    }
  }

  /**
   * constructor()
   */
  constructor(private _messageService: CdkMessageService) {
    super();
    this.actions = [];
    this.data = {};
    this.close = new Action({
      hidden: true
    });
  }
}
