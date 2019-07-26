import {
  Directive,
  Input,
  Output,
  IterableDiffers,
  TemplateRef,
  ViewContainerRef,
  DoCheck,
  EventEmitter,
  ViewRef
} from '@angular/core';
import { NgForOfContext } from './NgForOfContext';
import { RecordViewTuple } from './RecordViewTuple';

export function getTypeNameForDebugging(type) {
  return type['name'] || typeof type;
}

@Directive({
  selector: '[cdkNgFor][cdkNgForOf]'
})
export class CdkNgForOfDirective implements DoCheck {
  @Input() public set ngForOf(ngForOf: any[]) {
    this._ngForOf = ngForOf;
    this._ngForOfDirty = true;
  }

  @Input() public set ngForTrackBy(fn: any) {
    this._trackByFn = fn;
  }
  public get ngForTrackBy() {
    return this._trackByFn;
  }
  @Input() public set ngForTemplate(value: any) {
    if (value) {
      this._template = value;
    }
  }

  @Output() public onLast: EventEmitter<void> = new EventEmitter<void>();

  private _ngForOf: any[];
  private _ngForOfDirty: boolean;
  private _trackByFn: any;
  private _viewContainer: ViewContainerRef;
  private _template: TemplateRef<any>;
  private _differs: any;
  private _differ: any;

  constructor(
    viewContainer: ViewContainerRef,
    template: TemplateRef<any>,
    differs: IterableDiffers
  ) {
    this._viewContainer = viewContainer;
    this._template = template;
    this._differs = differs;
    this._ngForOfDirty = true;
    this._differ = null;
  }

  public ngDoCheck() {
    if (this._ngForOfDirty) {
      this._ngForOfDirty = false;
      const value = this._ngForOf;
      if (!this._differ && value) {
        try {
          this._differ = this._differs.find(value).create(this.ngForTrackBy);
        } catch (_a) {
          throw new Error(
            `Cannot find a differ supporting object '${value}' of type '${getTypeNameForDebugging(
              value
            )}'. CdkNgFor only supports binding to Iterables such as Arrays.`
          );
        }
      }
    }
    if (this._differ) {
      const changes = this._differ.diff(this._ngForOf);
      if (changes) {
        this._applyChanges(changes);
      }
    }
  }

  private _applyChanges(changes) {
    const insertTuples = [];

    changes.forEachOperation((item, adjustedPreviousIndex, currentIndex) => {
      if (item.previousIndex == null) {
        const view = this._viewContainer.createEmbeddedView(
          this._template,
          new NgForOfContext(null, this._ngForOf, -1, -1),
          currentIndex
        );
        const tuple = new RecordViewTuple(item, view);
        insertTuples.push(tuple);
      } else if (currentIndex == null) {
        this._viewContainer.remove(adjustedPreviousIndex);
      } else {
        const view = this._viewContainer.get(adjustedPreviousIndex);
        this._viewContainer.move(view, currentIndex);
        const tuple = new RecordViewTuple(item, /** @type {?} */ (view));
        insertTuples.push(tuple);
      }
    });

    for (const tuple of insertTuples) {
      this._perViewChange(tuple.view, tuple.record);
    }

    for (let i = 0, ilen = this._viewContainer.length; i < ilen; i++) {
      const viewRef: ViewRef = this._viewContainer.get(i);
      viewRef['context'].index = i;
      viewRef['context'].count = ilen;
      viewRef['context'].ngForOf = this._ngForOf;
    }
    changes.forEachIdentityChange(record => {
      const viewRef = this._viewContainer.get(record.currentIndex);
      viewRef['context'].$implicit = record.item;
    });
  }

  private _perViewChange(view, record) {
    view.context.$implicit = record.item;
  }
}
