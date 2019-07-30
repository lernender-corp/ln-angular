import {
  AfterContentInit,
  Component,
  ContentChildren,
  EventEmitter,
  Input,
  Output,
  QueryList,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';
import { Item, Library } from '@lernender/core';
import { CdkBase } from '@lernender/cdk/cdk-base';
import { LnTab } from '@lernender/forms/ln-tab';

@Component({
  moduleId: module.id,
  selector: 'ln-tab-panel',
  templateUrl: './ln-tab-panel.html',
  styleUrls: ['ln-tab-panel.css'],
  encapsulation: ViewEncapsulation.None
})
export class LnTabPanel extends CdkBase implements AfterContentInit {

  get tabContext() {
    return {
      tabs: this.tabs
    };
  }
  @Input() public template: TemplateRef<any>;
  @Input() public actionTemplate: TemplateRef<any>;
  @Input() public isHeaderSticky: boolean;
  @Output() public onTabChange: EventEmitter<Item> = new EventEmitter<Item>();
  @ContentChildren(LnTab) public tabs: QueryList<LnTab>;

  constructor() {
    super();
  }

  public handleTab(tab: Item) {
    if (Library.isDefined(tab)) {
      this.tabs.forEach(t => (t.active = false));
      tab.active = true;
      this.onTabChange.emit(tab);
    }
  }

  public ngAfterContentInit() {
    const tab = this.tabs.find(t => t.active);
    if (!tab && this.tabs.first) {
      this.tabs.first.active = true;
    }
  }
}
