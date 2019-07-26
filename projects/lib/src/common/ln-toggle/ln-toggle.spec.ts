import { async, TestBed, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { Component } from '@angular/core';
import { LnToggleModule, LnToggle } from '.';
import { By } from '@angular/platform-browser';


describe('LnToggle', () => {
    let component: TestToggle;
    let fixture: ComponentFixture<TestToggle>;
    let toggleContainer: HTMLElement;
    let inputElement: HTMLInputElement;
    let slideToggle: HTMLElement;
    let buttonToggle: HTMLButtonElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
        imports: [LnToggleModule],
        declarations: [TestToggle],
        });
        TestBed.compileComponents().then(() => {
            fixture = TestBed.createComponent(TestToggle);
            component = fixture.debugElement.componentInstance;
            inputElement = fixture.debugElement.query(By.css('input')).nativeElement;
            slideToggle = fixture.debugElement.query(By.css('ln-toggle')).nativeElement;
            buttonToggle = fixture.nativeElement.querySelector('button');
            toggleContainer = fixture.nativeElement.querySelector('div');
        });
    }));

    describe('basic behavior', () => {

      it('should create toggle component', () => {
        expect(component).toBeDefined();
      });

      it('should correctly update the disabled property', () => {
        expect(buttonToggle.disabled).toBeFalsy();

        component.isDisabled = true;
        fixture.detectChanges();

        expect(buttonToggle.disabled).toBeTruthy();
      });

      it('Increment number if clicked', () => {
        expect(component.toggleTriggered).toBe(0);

        buttonToggle.click();
        fixture.detectChanges();

        expect(component.toggleTriggered).toBe(1, 'Expect toggle once');
      });

      it('should set a element class if labelPosition is set to render after', () => {
        expect(toggleContainer.classList).not.toContain('label-after');

        component.labelPosition = 'after';
        fixture.detectChanges();

        expect(toggleContainer.classList).toContain('label-after');
      });
    });

  @Component({
    template:
        `<ln-toggle
            [disabled]="isDisabled"
            [value]="checked"
            [label]="'Test'"
            [labelPosition]="labelPosition"
            (click)="onToggle($event)"
        >
        </ln-toggle>`
  })
  class TestToggle {
    isDisabled: boolean = false;
    checked: boolean = false;
    labelPosition: string;
    toggleTriggered: number = 0;
    onToggle = () => this.toggleTriggered++;
  }
});
