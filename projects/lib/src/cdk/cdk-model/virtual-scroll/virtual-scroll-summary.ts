export interface IVirtualScrollSummary {
  item: {
    height: number,     //  Row height
    maxHeight: number,  //  {not used}
    maxWidth: number,   //  {not used}
    minHeight: number,  //  Row minHeight
    minWidth: number,   //  Row minWidth
    width: number       //  Row width
  };
  items: number;
  container: {
    height: number,
    length: number,
    width: number,
    item: {
      height: number,
      length: number,
      width: number,
    },
    index: {
      start: number,
      end: number
    }
  };
  scrollbar: {
    height: number,
    length: number,
    size: number,
    width: number,
    position: {
      current: number,
      max: number
      min: number,
    }
  };
  viewport: {
    height: number,   //  Viewport height 500px
    items: number,    //  Viewport Items  8 records
    length: number,   //  Viewport height or width
    sets: number,     //  Viewport Sets   44.25 sets
    width: number,    //  Viewport width  1000px
    position: {
      min: number,
      max: number
    }
  };
}
