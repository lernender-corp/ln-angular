import { Component, Input } from '@angular/core';

@Component({
  selector: 'cdk-default-tool-tip',
  templateUrl: './cdk-default-tooltip.html',
  styleUrls: ['./cdk-default-tooltip.scss']
})
export class CdkDefaultTooltip {
  @Input() text: string;
  @Input() style: object;

  constructor() {}
}
