import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LnSnackBar } from './ln-snackbar';
import { LnIconModule } from '../ln-icon';
import { By } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs';
import { Message, Action, Constant } from '@lernender/core';
import { LnSnackBarConfig } from './ln-snackbar-config';
import { ANIMATIONS, POSITION } from './ln-snackbar-const';

const additionalWaitTimes = {
  DEFAULT_TIMEOUT: 1000,
  WAIT_TIMEOUT: 500 // should be less than default timeout additional wait time
};

describe('LnSnackBar', () => {
  let component: LnSnackBar;
  let fixture: ComponentFixture<LnSnackBar>;
  let originalJasmineTimeout;

  const setup = () => {
    originalJasmineTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = Constant.NotificationTimeout.Standard + additionalWaitTimes.DEFAULT_TIMEOUT;
    const _fixture = TestBed.createComponent(LnSnackBar);
    const _component = _fixture.componentInstance;
    _fixture.detectChanges();
    _component.announcement = new BehaviorSubject<Message>(undefined);
    return { _component, _fixture };
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [LnIconModule],
      declarations: [LnSnackBar]
    }).compileComponents();
  }));

  beforeEach(() => {
    const setupOptions = setup();
    component = setupOptions._component;
    fixture = setupOptions._fixture;
  });

  it('should create the component', () => {
    expect(component).toBeDefined();
  });

  describe('_render()', () => {
    it('should switch #showIt to true', () => {
      component['_render']();
      expect(component.showIt).toBeTruthy();
    });
    it('should switch #showIt to false based on the duration property', (done) => {
      const { _component, _fixture } = setup();
      _component['_render']();
      setTimeout(() => {
        expect(_component.showIt).toBeFalsy();
        done();
      }, component.config.duration + additionalWaitTimes.WAIT_TIMEOUT);
    });
  });
  describe('_remove()', () => {
    it('should switch #showIt to false', (done) => {
      component['_remove']();
      setTimeout(() => {
        expect(component.showIt).toBeFalsy();
        done();
      }, 100); // wait for animation to happen
    });
  });
  describe('_generateCssByConfig()', () => {
    const testStyleBottom = {
      left: {
        left: '20px',
        animation: ANIMATIONS.SLIDETOP,
        bottom: '0px'
      },
      right: {
        right: '20px',
        animation: ANIMATIONS.SLIDETOP,
        bottom: '0px'
      },
      center: {
        left: '50%',
        animation: ANIMATIONS.SLIDETOPCENTER,
        bottom: '0px'
      }
    };
    const testStyleTop = {
      left: {
        left: '20px',
        animation: ANIMATIONS.SLIDEBOTTOM,
        top: '0px'
      },
      right: {
        right: '20px',
        animation: ANIMATIONS.SLIDEBOTTOM,
        top: '0px'
      },
      center: {
        left: '50%',
        animation: ANIMATIONS.SLIDEBOTTOMCENTER,
        top: '0px'
      }
    };
    it('should return style object based on the config "center bottom" ', () => {
      const style = component['_generateCssByConfig']();
      expect(style).toEqual(testStyleBottom.center);
    });
    it('should return style object based on the config "left bottom" ', () => {
      component.config.horizontalPosition = POSITION.LEFT;
      const style = component['_generateCssByConfig']();
      expect(style).toEqual(testStyleBottom.left);
    });
    it('should return style object based on the config "right bottom" ', () => {
      component.config.horizontalPosition = POSITION.RIGHT;
      const style = component['_generateCssByConfig']();
      expect(style).toEqual(testStyleBottom.right);
    });
    // Test with different vertical positioning
    it('should return style object based on the config "center top" ', () => {
      component.config.verticalPosition = POSITION.TOP;
      const style = component['_generateCssByConfig']();
      expect(style).toEqual(testStyleTop.center);
    });
    it('should return style object based on the config "left top" ', () => {
      component.config.verticalPosition = POSITION.TOP;
      component.config.horizontalPosition = POSITION.LEFT;
      const style = component['_generateCssByConfig']();
      expect(style).toEqual(testStyleTop.left);
    });
    it('should return style object based on the config "right top" ', () => {
      component.config.verticalPosition = POSITION.TOP;
      component.config.horizontalPosition = POSITION.RIGHT;
      const style = component['_generateCssByConfig']();
      expect(style).toEqual(testStyleTop.right);
    });
  });
  describe('_generateAnimation(xcord: string, ycord: string)', () => {
    it('should return slide in animation for "top center"', () => {
      component.config.verticalPosition = POSITION.TOP;
      const animation = component['_generateAnimation'](POSITION.CENTER, POSITION.TOP);
      expect(animation).toBe(ANIMATIONS.SLIDEBOTTOMCENTER);
    });
    it('should return slide in animation for "top right"', () => {
      component.config.verticalPosition = POSITION.TOP;
      const animation = component['_generateAnimation'](POSITION.RIGHT, POSITION.TOP);
      expect(animation).toBe(ANIMATIONS.SLIDEBOTTOM);
    });
    it('should return slide in animation for "top left"', () => {
      component.config.verticalPosition = POSITION.TOP;
      const animation = component['_generateAnimation'](POSITION.LEFT, POSITION.TOP);
      expect(animation).toBe(ANIMATIONS.SLIDEBOTTOM);
    });
    it('should return slide in animation for "bottom center"', () => {
      component.config.verticalPosition = POSITION.BOTTOM;
      const animation = component['_generateAnimation'](POSITION.CENTER, POSITION.BOTTOM);
      expect(animation).toBe(ANIMATIONS.SLIDETOPCENTER);
    });
    it('should return slide in animation for "bottom right"', () => {
      component.config.verticalPosition = POSITION.BOTTOM;
      const animation = component['_generateAnimation'](POSITION.RIGHT, POSITION.BOTTOM);
      expect(animation).toBe(ANIMATIONS.SLIDETOP);
    });
    it('should return slide in animation for "bottom left"', () => {
      component.config.verticalPosition = POSITION.BOTTOM;
      const animation = component['_generateAnimation'](POSITION.LEFT, POSITION.BOTTOM);
      expect(animation).toBe(ANIMATIONS.SLIDETOP);
    });
  });
  describe('announcement BehaviorSubject', () => {
    let compElement: HTMLElement;

    const getCompElement = (fixture: ComponentFixture<LnSnackBar>): HTMLElement => {
      return fixture.nativeElement.querySelector('.ln-snackbar');
    };

    const announcementSetup = () => {
      const { _component, _fixture } = setup();
      const actions = [new Action({label: 'click me'})];
      const message = new Message({label: 'Test Message', action: [...actions]});
      _component.announcement.next(message);
      _component.announcement.subscribe(() => {
        _component.style = _component['_generateCssByConfig']();
        _component['_render']();
      });
      _fixture.detectChanges();
      const _compElement: HTMLElement = getCompElement(_fixture);
      return { _component, _fixture, _compElement };
    };

    beforeEach(() => {
      const setupOptions = announcementSetup();
      component = setupOptions._component;
      fixture = setupOptions._fixture;
      compElement = setupOptions._compElement;
    });

    it('should emit new message and render the element', () => {
      expect(compElement.children.length).toBeGreaterThan(0);
    });

    it('should emit new message and render it on the DOM with correct message', () => {
      expect(compElement.querySelector('.ln-snackbar__message').textContent).toContain('Test Message');
    });

    it('should emit new message and render the message with action button', () => {
      expect(compElement.querySelector('.ln-snackbar__actions-action').textContent).toContain('click me');
    });

    it('should be removed when "close" button is clicked', (done) => {
      const { _fixture, _compElement } = announcementSetup();
      const closeBtn: HTMLElement = _compElement.querySelector('ln-icon');
      closeBtn.click();
      setTimeout(() => {
        _fixture.detectChanges();
        expect(getCompElement(_fixture)).toBeNull();
        done();
      }, component.config.duration + additionalWaitTimes.WAIT_TIMEOUT); // wait for amimation to happen
    });
  });

  afterEach(async(() => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalJasmineTimeout;
  }));
});
