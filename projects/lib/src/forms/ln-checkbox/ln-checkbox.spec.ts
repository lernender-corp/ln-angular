import { async, TestBed, ComponentFixture } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Constant } from '@lernender/core';
import { LnCheckBox } from './ln-checkbox';
import { Component, EventEmitter, Output, Input } from '@angular/core';


describe('LnCheckBox', () => {
    let component: LnCheckBox;
    let fixture: ComponentFixture<LnCheckBox>;

    const clickCheckbox = (checkbox: any): void => {
        // This uses HTML structure of ln-icon to get the
        checkbox.querySelector('ln-icon i').click();
    };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule],
            declarations: [LnCheckBox, LnIconStub],
        });
        TestBed.compileComponents().then(() => {
            fixture = TestBed.createComponent(LnCheckBox);
            component = fixture.debugElement.componentInstance;
            // This is needed to fully render ln-icon
            fixture.detectChanges();
        });
    }));

    // Regular LnButton tests
    describe('ln-checkbox', () => {
        it('should create a checkbox', () => {
            expect(component).toBeTruthy();
        });

        it('should update state on click', () => {
            expect(component.value).toBe(false);
            clickCheckbox(fixture.nativeElement);
            expect(component.value).toBe(true);
        });

        it('should return either a boolean or an enum', () => {
            expect(component.value).toBe(false);
            component.value = Constant.Checkbox.Checked as (boolean | Constant.Checkbox);
            expect(component.value).toBe(Constant.Checkbox.Checked);

            component.value = Constant.Checkbox.Unchecked as (boolean | Constant.Checkbox);
            expect(component.value).toBe(Constant.Checkbox.Unchecked);

            component.value = Constant.Checkbox.Deselect  as (boolean | Constant.Checkbox);
            expect(component.value).toBe(Constant.Checkbox.Deselect);

            component.value = false as (boolean | Constant.Checkbox);
            component.value = 1 as (boolean | Constant.Checkbox);
            expect(component.value).toBe(false);
        });

        it('should go from deselect to unchecked', () => {
            expect(component.value).toBe(false);
            component.value = Constant.Checkbox.Deselect;
            clickCheckbox(fixture.nativeElement);
            expect(component.value).toBeFalsy();
        });

        it('should trigger change events for appropriate values', () => {
            let numberOfTimesChangeTriggered: number = 0;
            const captureChange = () => {
                numberOfTimesChangeTriggered++;
            };
            component.registerOnChange(captureChange);

            component.value = true;
            expect(numberOfTimesChangeTriggered).toBe(1);

            component.value = false;
            expect(numberOfTimesChangeTriggered).toBe(2);

            component.value = Constant.Checkbox.Checked;
            expect(numberOfTimesChangeTriggered).toBe(3);

            component.value = Constant.Checkbox.Checked;
            expect(numberOfTimesChangeTriggered).toBe(3);

            component.value = 5;
            expect(numberOfTimesChangeTriggered).toBe(3);
        });

        it('should correctly show if empty', () => {
            expect(component.isEmpty()).toBe(true);

            component.value = true;
            expect(component.isEmpty()).toBe(false);

            component.value = Constant.Checkbox.Unchecked;
            expect(component.isEmpty()).toBe(true);

            component.value = Constant.Checkbox.Checked;
            expect(component.isEmpty()).toBe(false);

            component.value = false;
            component.value = 1;
            expect(component.isEmpty()).toBe(true);
        });

        it('should empty the checkbox', () => {
            component.value = true;
            component.empty();
            expect(component.isEmpty()).toBe(true);
        });
    });

    /** Stub components used in LnCheckbox. */
    @Component({ selector: 'ln-icon', template: '<i (click)=handleOnClick($event)></i>' })
    class LnIconStub {
        @Input() public name: string;
        @Input() public padRight: boolean;
        @Output() public onClick: EventEmitter<any> = new EventEmitter();

        public handleOnClick($event: MouseEvent) {
            this.onClick.emit($event);
        }
    }
});
