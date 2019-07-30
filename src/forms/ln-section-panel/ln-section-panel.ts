import {
  AfterContentInit,
  Component,
  ContentChildren,
  EventEmitter,
  Input,
  Output,
  QueryList,
  ViewEncapsulation,
  OnInit
} from '@angular/core';
//
// ln-core
//
import { Action, Library } from '@lernender/core';
//
// CDK
//
import { CdkBase } from '@lernender/cdk/cdk-base';
//
// Child Components
//
import { LnSection } from '@lernender/forms/ln-section';

@Component({
  moduleId: module.id,
  selector: 'ln-section-panel',
  templateUrl: './ln-section-panel.html',
  styleUrls: ['ln-section-panel.css'],
  encapsulation: ViewEncapsulation.None
})
export class LnSectionPanel extends CdkBase
  implements AfterContentInit, OnInit {
  @Input() public label: string;
  @Input() public style: any;
  @Input() public tabs: boolean;
  @Input() public styleContent: any;
  @Input() public disabled: boolean;
  @Input() public hidden: boolean;
  @Output() public onSectionChange: EventEmitter<any> = new EventEmitter();
  //
  // Content Children
  //
  @ContentChildren(LnSection) public sections: QueryList<LnSection>;
  /**
   * Public Variables
   */
  public sectionTabs: any[];

  constructor() {
    super();
    this.label = '';
    this.tabs = true;
    this.sectionTabs = [];
    this.styleContent = {};
    this.disabled = false;
    this.hidden = false;
  }
  /**
   * Private Variables
   */
  // private _subscription: Subscription;

  //
  // handleTab()
  //
  public handleTab(tab: Action) {
    //
    // Set Active Tab
    //
    if (this.tabs) {
      this.sections.toArray().forEach(s => (s.active = s['uid'] === tab.uid));
      this.sectionTabs.forEach(f => (f.active = f.uid === tab.uid));
      if (Library.isDefined(this.onSectionChange)) {
        this.onSectionChange.emit(tab);
      }
    }
  }
  //
  // ngOnInit()
  //
  public ngOnInit() {
    //
    // Override Style
    //
    this.style = { height: '100vh', ...this.style};
    this.styleContent = {...this.styleContent};
  }
  //
  // ngAfterContentInit()
  //
  public ngAfterContentInit() {
    //
    // Sections
    //
    const sections: LnSection[] = this.sections.toArray();
    //
    // If we have section(s)
    //
    if (Library.isArrayWithLength(sections)) {
      //
      // Create a list of objects based on Secion Labels
      //
      this.sectionTabs = sections.map((s: any) => {
        const tab = {
          uid: s.uid,
          label: s.label,
          active: s.active,
          hidden: s.hidden
        };
        return tab;
      });

      //
      // Set the Active Form
      //
      if (this.tabs) {
        const section = this.sections.find(s => s.active);
        if (!section && this.sections.first) {
          this.sections.first.active = true;
        }
      }
    }
  }
}
