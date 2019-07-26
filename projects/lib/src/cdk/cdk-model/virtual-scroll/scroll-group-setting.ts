export interface ScrollGroupSetting {
  childWidth: number;
  childHeight: number;
  items: any[];
}

export interface ScrollGroupSettings {
  numberOfKnownWrapGroupChildSizes: number;
  sumOfKnownWrapGroupChildWidths: number;
  sumOfKnownWrapGroupChildHeights: number;
  maxChildSize: ScrollGroupSetting[];
}
