
//
// Define Virtual Scroll Default Config
//
export interface VirtualScrollConfig {
  throttle: number;
  debounce: number;
  animationInterval: number;
  scrollbarWidth?: number;
  scrollbarHeight?: number;
  resizeInterval: number;
}

export function VIRTUAL_SCROLLER_DEFAULT_OPTIONS_FACTORY(): VirtualScrollConfig {
  return {
    throttle: 0,
    debounce: 0,
    animationInterval: 200,
    resizeInterval: 1000
  };
}
