import { Component, Input, TemplateRef } from '@angular/core';
import { CdkBase, CdkMessageService } from '../../cdk';
import { Action } from '@lernender/core';

@Component({
  moduleId: module.id,
  selector: 'ln-alert-dialog',
  templateUrl: './ln-alert-dialog.html',
  styleUrls: ['./ln-alert-dialog.scss'],
  entryComponents: []
})

export class LnAlertDialog extends CdkBase {
  @Input('template') template: TemplateRef<any>;
  @Input() heading: String;
  @Input() message: String;
  @Input() actions: Action[];

  /**
   * Open()
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
    item.onClick(item);
    setTimeout(() => {
      this.Close();
    }, 10);
  }

  /**
   * ngOnInit()
   */
  public ngOnInit() {
  }

  /**
   * constructor()
   */
  constructor(private _messageService: CdkMessageService) {
    super();
  }
}
