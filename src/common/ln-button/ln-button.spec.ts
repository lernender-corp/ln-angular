import {async, TestBed, ComponentFixture} from '@angular/core/testing';
import {Component} from '@angular/core';
import {LnButtonModule, LnButton} from './index';


describe('LnButton', () => {
    let component: TestButton;
    let fixture: ComponentFixture<TestButton>;
    let buttonElement: HTMLButtonElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
        imports: [LnButtonModule],
        declarations: [TestButton],
        });
        TestBed.compileComponents().then(() => {
            fixture = TestBed.createComponent(TestButton);
            component = fixture.debugElement.componentInstance;
            buttonElement = fixture.nativeElement.querySelector('button');
        });
    }));

  // Regular button tests
  describe('ln-button', () => {
    it('should handle a click on the button', () => {
        buttonElement.click();
        expect(component.clickCount).toBe(1);
    });

    it('should not increment if disabled', () => {
        component.isDisabled = true;
        fixture.detectChanges();
        buttonElement.click();
        expect(component.clickCount).toBe(0);
    });

    it('should disable the native button element', () => {
        expect(buttonElement.disabled).toBeFalsy();
        component.isDisabled = true;
        fixture.detectChanges();
        expect(buttonElement.disabled).toBeTruthy();
    });

  });

    /** Test component that contains an LnButton. */
    @Component({
    selector: 'test-button',
    template: `<ln-button class="btn-primary" (click)="increment()" [disabled]=isDisabled>Def</ln-button>`
    })
    class TestButton {
    clickCount: number = 0;
    isDisabled: boolean = false;

    increment() {
        this.clickCount++;
    }
    }
});
