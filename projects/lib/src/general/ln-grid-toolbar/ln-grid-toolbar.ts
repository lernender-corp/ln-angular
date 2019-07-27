import { Component, Input, OnInit } from '@angular/core';
import { Action } from '@lernender/core';

@Component({
  selector: 'ln-grid-toolbar',
  templateUrl: 'ln-grid-toolbar.html',
  styleUrls: ['ln-grid-toolbar.scss']
})
export class LnGridToolBar implements OnInit {
  @Input() public all: Action;
  @Input() public label: string;
  @Input() public style: object;
  @Input() public toolbarOffset: number;
  @Input() public actions: Action[] = new Array<Action>();
  public checkboxStyle: object;
  /**
   * constructor()
   */
  constructor() {
    this.all = new Action();
    this.label = '';
    this.style = {};
    this.actions = [];
  }

  ngOnInit(): void {
    this.checkboxStyle = {'margin-left':this.toolbarOffset, ...this.all.style};
  }

  //
  // handleAction()
  //
  public handleAction(action: Action) {
    this.actions.forEach(a => (a.active = action.uid === a.uid));
    if (action.hasOnClick()) {
      action.onClick(action);
    }
  }
}
