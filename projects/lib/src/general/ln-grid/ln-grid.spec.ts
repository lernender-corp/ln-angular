import { async, TestBed, ComponentFixture } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { LnGrid } from './ln-grid';
import { Component, EventEmitter, Output, Input } from '@angular/core';
import { ChangeEvent } from '../../cdk';
import { Action, GridOption, GridColumn, Message, Constant, GridRow, GridSchema, Response } from '@lernender/core';
import { ScrollDispatchModule } from '@angular/cdk/scrolling'
import { BehaviorSubject, Observable, Subscriber } from 'rxjs';
import { By } from '@angular/platform-browser';

describe('LnGrid', () => {
    let hostComponent: TestLnGrid;
    let fixture: ComponentFixture<TestLnGrid>;
    let component: LnGrid;

    const testSchema = [
        {
          label: '',
          field: 'checked',
          cellComponent: {
            type: 'checkbox'
          },
          resizeable: false,
          sort: {
            disabled: true
          }
        },
        {
          label: 'Test Property',
          field: 'testProp',
          width: '200px',
          editable: false,
          filterEnable: true,
          resizeable: false
        }
    ];

    class TestData {
        public testProp: any;

        constructor(options: any) {
            this.testProp = options;
        }
    }

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule, ScrollDispatchModule],
            declarations: [
                TestLnGrid,
                LnGrid,
                LnIconStub,
                LnCheckBoxStub,
                LnGridToolbarStub,
                LnGridFilterStub,
                LnGridCellStub
            ],
        });
        TestBed.compileComponents().then(() => {
            fixture = TestBed.createComponent(TestLnGrid);
            hostComponent = fixture.debugElement.componentInstance;
            component = fixture.debugElement.query(By.directive(LnGrid)).componentInstance;
            hostComponent.schema = new GridSchema({
                columns: testSchema,
                rowCheckSelection: Constant.GridSchemaSelection.Multi
            });
            fixture.detectChanges();
        });
    }));

    const addDataToGrid = (data: any[]): void => {
        hostComponent.data = Observable
            .create((observer: Subscriber<Response>) => {
                observer.next(new Response([...data]));
                observer.complete();
            });
        fixture.detectChanges();
    };

    it('should create a grid', () => {
        expect(component).toBeTruthy();
        expect(hostComponent).toBeTruthy();
    });

    describe('displaying data >', () => {
        it('should initialize all displays as false', () => {
            expect(component.shouldDisplayNoData).toBe(false);
            expect(component.shouldDisplayNoRecordsFound).toBe(false);
            expect(component.shouldDisplayRecords).toBe(false);
        });
        it('should show no data when nothing passed in', () => {
            addDataToGrid([]);
            expect(component.shouldDisplayNoData).toBe(true);
            expect(component.shouldDisplayNoRecordsFound).toBe(false);
            expect(component.shouldDisplayRecords).toBe(false);
        });
        it('should show data when anything passed in', () => {
            addDataToGrid([new TestData('1')]);
            expect(component.grid.hasData()).toBe(true);
            expect(component.grid.hasColumns()).toBe(true);
            expect(component.shouldDisplayNoData).toBe(false);
            expect(component.shouldDisplayNoRecordsFound).toBe(false);
            expect(component.shouldDisplayRecords).toBe(true);
        });
    });

    describe('selecting data', () => {
        it('should select all rows when all checkbox selected', () => {
            addDataToGrid([new TestData('1'), new TestData('2')]);
            expect(component.getCheckedRows().length).toBe(0);
            component.allCheckBox.onClick(true, false);
            expect(component.getCheckedRows().length).toBe(2);
        });
        it('should deselect all rows when all checkbox deselected', () => {
            addDataToGrid([new TestData('1'), new TestData('2')]);
            expect(component.getCheckedRows().length).toBe(0);
            component.allCheckBox.onClick(true, false);
            component.allCheckBox.onClick(false, false);
            expect(component.getCheckedRows().length).toBe(0);
        });
    });

    describe('filtering data', () => {
        /**
         * Need test to make sure rows were filtered and nothing is displayed
         * (make sure to check gridSummary showing correct stuff)
         */
    });

    // Container for ln-grid so ngOnChanges gets called
    @Component({ template: `
    <ln-grid
        [options]="options"
        [schema]="schema"
        [data]="data"
    ></ln-grid>` })
    class TestLnGrid {
        public data: Observable<any>;
        public schema: any;
        public options: GridOption;

        constructor() { }
    }

    @Component({ selector: 'ln-grid-toolbar', template: '' })
    class LnGridToolbarStub {
        @Input() public all: Action;
        @Input() public label: string;
        @Input() public style: object;
        @Input() public height: number;
        @Input() public toolbarOffset: number;
        @Input() public actions: Action[] = new Array<Action>();
    }

    @Component({ selector: 'ln-grid-filter', template: '' })
    class LnGridFilterStub {
        @Input() public column: GridColumn;
        @Input() public bus: BehaviorSubject<Message>;
        @Output() public onFilter: EventEmitter<any> = new EventEmitter();
    }

    @Component({ selector: 'ln-icon', template: '' })
    class LnIconStub {
        @Input() public disabled: boolean;
        @Input() public hidden: boolean;
        @Input() public active: boolean;
        @Input() public style: object;
        @Input() public color: string;
        @Input() public type: string;
        @Input() public name: string;
        @Input() public padLeft: boolean;
        @Input() public padRight: boolean;
        @Input() public inputIcon: boolean;
        @Output() public onClick: EventEmitter<any> = new EventEmitter();
    }

    @Component({ selector: 'ln-checkbox', template: '' })
    class LnCheckBoxStub {
        @Input() public value: boolean | Constant.Checkbox;
        @Input() public label: string;
        @Input() public indeterminate: boolean;
        @Input() public disabled: boolean;
        @Input() public hidden: boolean;
        @Input() public visibility: boolean;
        @Input() public style: object;
        @Output() public onClick: EventEmitter<boolean | Constant.Checkbox> = new EventEmitter();
    }

    @Component({ selector: 'ln-grid-cell', template: '' })
    class LnGridCellStub {
        @Input() public column: GridColumn;
        @Input() public row: GridRow;
        @Input() public disabled: boolean;
        @Output() public onChange: EventEmitter<any> = new EventEmitter();
        @Output() public onCheck: EventEmitter<any> = new EventEmitter();
        @Output() public onAdd: EventEmitter<any> = new EventEmitter();
        @Output() public onEdit: EventEmitter<any> = new EventEmitter();
        @Output() public onDelete: EventEmitter<any> = new EventEmitter();
        @Output() public onActivated: EventEmitter<any> = new EventEmitter();
        @Output() public onDeactivated: EventEmitter<any> = new EventEmitter();
        @Output() public onRevert: EventEmitter<any> = new EventEmitter();
        @Output() public onDownload: EventEmitter<any> = new EventEmitter();
        @Output() public onIcon: EventEmitter<any> = new EventEmitter();
        @Output() public onLink: EventEmitter<any> = new EventEmitter();
        @Output() public onView: EventEmitter<any> = new EventEmitter();
        @Output() public onFilter: EventEmitter<any> = new EventEmitter();
    }
});
