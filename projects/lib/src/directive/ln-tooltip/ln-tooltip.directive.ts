import {
  ComponentFactoryResolver,
  // ComponentRef,
  Directive,
  // ElementRef,
  // Injector,
  Input,
  // Renderer2,
  // TemplateRef,
  Type,
  ViewContainerRef,
  // ReflectiveInjector,
  // HostListener,
  OnDestroy
} from '@angular/core';
// import { Library } from '@lernender/core';

@Directive({
  selector: '[ln-tooltip]',
  host: {
    '(window:resize)': 'onResize($event)',
    '(mouseenter)': 'onMouseEnter($event)',
    '(mouseleave)': 'onMouseLeave($event)'
  }
})
export class LnToolTipDirective implements OnDestroy {
  @Input('ln-tooltip') component: Type<any>;
  @Input('data') data: any;

  private _componentRef: any;

  //
  // onResize()
  //
  public onResize($event: MouseEvent) {
    if ($event) {}
  }

  //
  // onMouseEnter()
  //
  public onMouseEnter($event: MouseEvent) {

    if ($event) {}

    //
    // If the component reference is defined then leave funciton
    //
    if (this._componentRef) {
      return;
    }

    const factory = this.resolver.resolveComponentFactory(this.component as Type<any>);
    //
    // Create a reference to the component dynamically
    //
    this._componentRef = this.vcr.createComponent(factory);
  }
  //
  // onMouseLeave()
  //
  public onMouseLeave($event: MouseEvent) {
    if ($event) {}
    this._destroy();
  }
  //
  // ngOnDestroy()
  //
  public ngOnDestroy() {
    this._destroy();
  }
  //
  // _ngContent()
  //
  // private _ngContent() {
  //   if (typeof this.content === 'string') {
  //     const element = this.renderer.createText(this.content);
  //     return [[element]];
  //   } else if (this.content instanceof TemplateRef) {
  //     const context = {};
  //     const viewRef = this.content.createEmbeddedView(context);
  //     return [viewRef.rootNodes];
  //   } else {
  //     const factory = this.resolver.resolveComponentFactory(this.content as Type<any>);
  //     const _componentRef = factory.create(this.injector);
  //     return [[_componentRef.location.nativeElement]];
  //   }
  // }
  //
  // _destroy()
  //
  private _destroy() {
    if (this._componentRef) {
      this._componentRef.destroy();
    }
    this._componentRef = undefined;
  }

  constructor(
    // private element: ElementRef,
    // private renderer: Renderer2,
    // private injector: Injector,
    private resolver: ComponentFactoryResolver,
    private vcr: ViewContainerRef
  ) {}
}
