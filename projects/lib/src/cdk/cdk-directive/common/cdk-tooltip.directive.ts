import { Library } from '@lernender/core';
import {
  Directive,
  Input,
  TemplateRef,
  ComponentRef,
  ElementRef,
  ViewContainerRef,
  HostListener,
  InjectionToken,
  Inject,
  OnInit,
  OnDestroy
} from '@angular/core';
import {
  OverlayRef,
  OverlayPositionBuilder,
  Overlay, ConnectedPosition,
  ScrollStrategy,
  FlexibleConnectedPositionStrategy,
  HorizontalConnectionPos,
  VerticalConnectionPos,
  OriginConnectionPosition,
  OverlayConnectionPosition
} from '@angular/cdk/overlay';
import { ComponentPortal, TemplatePortal } from '@angular/cdk/portal';

import { CdkDefaultTooltip } from '../../cdk-component/cdk-default-tooltip/cdk-default-tooltip';
import { getStyle, injectCSS } from '../../cdk-library';


/**
 * This is a directive that displays tooltip based on string or template that it's received
 * Future development:
 * 1. support object as input
 */

/** CSS from '~@angular/cdk/overlay-prebuilt.css' */
const CSSRULE =
'.cdk-global-overlay-wrapper,.cdk-overlay-container{pointer-events:none;top:0;left:0;height:100%;width:100%}' +
'.cdk-overlay-container{position:fixed;z-index:1000}.cdk-overlay-container:empty{display:none}' +
'.cdk-global-overlay-wrapper{display:flex;position:absolute;z-index:1000}' +
'.cdk-overlay-pane{position:absolute;pointer-events:auto;box-sizing:border-box;z-index:1000;display:flex;max-width:100%;max-height:100%}' +
'.cdk-overlay-backdrop{position:absolute;top:0;bottom:0;left:0;right:0;z-index:1000;pointer-events:auto;' +
'-webkit-tap-highlight-color:transparent;transition:opacity .4s cubic-bezier(.25,.8,.25,1);opacity:0}' +
'.cdk-overlay-backdrop.cdk-overlay-backdrop-showing{opacity:1}' +
'@media screen and (-ms-high-contrast:active){.cdk-overlay-backdrop.cdk-overlay-backdrop-showing{opacity:.6}}' +
'.cdk-overlay-dark-backdrop{background:rgba(0,0,0,.32)}.cdk-overlay-transparent-backdrop,' +
'.cdk-overlay-transparent-backdrop.cdk-overlay-backdrop-showing{opacity:0}.cdk-overlay-connected-position-bounding-box' +
'{position:absolute;z-index:1000;display:flex;flex-direction:column;min-width:1px;min-height:1px}' +
'.cdk-global-scrollblock{position:fixed;width:100%;overflow-y:scroll}';

/** Time in ms to throttle repositioning after scroll events. */
export const SCROLL_THROTTLE_MS = 5;

/** Injection token that determines the scroll handling while a tooltip is visible. */
export const CDK_TOOLTIP_SCROLL_STRATEGY =
    new InjectionToken<() => ScrollStrategy>('cdk-tooltip-scroll-strategy');

/** @docs-private */
export function CDK_TOOLTIP_SCROLL_STRATEGY_FACTORY(overlay: Overlay): () => ScrollStrategy {
  return () => overlay.scrollStrategies.reposition({scrollThrottle: SCROLL_THROTTLE_MS});
}

/** @docs-private */
export const CDK_TOOLTIP_SCROLL_STRATEGY_FACTORY_PROVIDER = {
  provide: CDK_TOOLTIP_SCROLL_STRATEGY,
  deps: [Overlay],
  useFactory: CDK_TOOLTIP_SCROLL_STRATEGY_FACTORY,
};

@Directive({
  selector: '[cdkTooltip]'
})
export class CdkTooltipDirective implements OnInit, OnDestroy {

  @Input('cdkTooltip')
  public content: string | object;

  @Input('cdkTooltipTemplate')
  public template: TemplateRef<any>;

  @Input('cdkTooltipStyle')
  public style: object;

  private _position: ConnectedPosition;

  @Input('cdkTooltipPosition')
  get position(): ConnectedPosition {
    return this._position;
  }
  set position(value: ConnectedPosition) {
    // Type guard against input values at runtime
    if (!Library.isNullOrUndefined(value) && value.originX && value.originY && value.overlayX && value.overlayY) {
      if (value !== this._position) {
        this._position = value;
        if (this._overlayRef) {
          this._updatePosition();
          this._overlayRef.updatePosition();
        }
      }
    }
  }

  private _overlayRef: OverlayRef;
  private _scrollStrategy: () => ScrollStrategy;

  constructor(
    private _overlayPositionBuilder: OverlayPositionBuilder,
    private _elementRef: ElementRef,
    private _overlay: Overlay,
    private _vcr: ViewContainerRef,
    @Inject(CDK_TOOLTIP_SCROLL_STRATEGY) scrollStrategy: any,
    @Inject('WINDOW') private window: any) {
      this._scrollStrategy = scrollStrategy;
      this.content = '';
      this.style = {};
      this._position = {
        originX: 'center',
        originY: 'top',
        overlayX: 'center',
        overlayY: 'bottom'
      };
    }

  ngOnInit(): void {
    if (Library.isUndefined(getStyle(this.window, '.cdk-global-overlay-wrapper'))) {
      injectCSS(document, CSSRULE);
    }
  }

  ngOnDestroy() {
    this.detach();
  }

  @HostListener('mouseover')
  show() {
    const positionStrategy = this._overlayPositionBuilder
      // Create position attached to the elementRef
      .flexibleConnectedTo(this._elementRef)
      .withPositions([this.position]);

    // Connect position strategy
    this._overlayRef = this._overlay.create({
      positionStrategy,
      scrollStrategy: this._scrollStrategy()
    });

    this._updatePosition();

    // Create tooltip portal
    if (!Library.isNullOrUndefined(this.template)) {
      const templatePortal = new TemplatePortal(this.template, this._vcr, this.content);
      // Attach tooltip portal to overlay
      this._overlayRef.attach(templatePortal);
    } else if (Library.isNullOrUndefined(this.template) &&
              typeof this.content === 'string' && // Note: Compiler doesn't compile with Library.isStringWithLength(this.content)
              this.content.length > 0) {
      const componentPortal = new ComponentPortal(CdkDefaultTooltip);
      const componentRef: ComponentRef<CdkDefaultTooltip> = this._overlayRef.attach(componentPortal);
      componentRef.instance.text = this.content;
      componentRef.instance.style = this.style;
    }
  }

  @HostListener('mouseout')
  @HostListener('wheel')
  @HostListener('window:resize')
  @HostListener('click')
  detach() {
    if (!Library.isUndefined(this._overlayRef)) {
      this._overlayRef.detach();
    }
  }

  /** Updates the position of the current tooltip. */
  private _updatePosition() {
    const position =
        this._overlayRef!.getConfig().positionStrategy as FlexibleConnectedPositionStrategy;
    const origin = this._getOrigin();
    const overlay = this._getOverlayPosition();

    position.withPositions([
      {...origin.main, ...overlay.main},
      {...origin.fallback, ...overlay.fallback}
    ]);
  }

  /**
   * Returns the origin position and a fallback position based on the user's position preference.
   * The fallback position is the inverse of the origin (e.g. `'below' -> 'above'`).
   */
  private _getOrigin(): {main: OriginConnectionPosition, fallback: OriginConnectionPosition} {
    let originPosition: OriginConnectionPosition;
    originPosition = {
      originX: this._position.originX,
      originY: this._position.originY
    };

    const {x, y} = this._invertPosition(originPosition.originX, originPosition.originY);

    return {
      main: originPosition,
      fallback: {originX: x, originY: y}
    };
  }

  /** Returns the overlay position and a fallback position based on the user's preference */
  private _getOverlayPosition(): {main: OverlayConnectionPosition, fallback: OverlayConnectionPosition} {
    let overlayPosition: OverlayConnectionPosition;
    overlayPosition = {
      overlayX: this._position.overlayX,
      overlayY: this._position.overlayY
    };

    const {x, y} = this._invertPosition(overlayPosition.overlayX, overlayPosition.overlayY);

    return {
      main: overlayPosition,
      fallback: {overlayX: x, overlayY: y}
    };
  }

  /** Inverts an overlay position. */
  private _invertPosition(x: HorizontalConnectionPos, y: VerticalConnectionPos) {
    if (this.position.overlayY === 'top' || this.position.overlayY === 'bottom') {
      if (y === 'top') {
        y = 'bottom';
      } else if (y === 'bottom') {
        y = 'top';
      }
    } else {
      if (x === 'end') {
        x = 'start';
      } else if (x === 'start') {
        x = 'end';
      }
    }

    return {x, y};
  }
}
