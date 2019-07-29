import { storiesOf, moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { actions } from '@storybook/addon-actions';
import { LnButtonModule } from './ln-button.module';


const props = {
  disabled: true,
  hidden: false
};

storiesOf('LnButton', module)
  .addDecorator(
    moduleMetadata({
      imports: [CommonModule, LnButtonModule],
      declarations: []
    })
  )
  .add('ln-button', () => ({
    template: `<ln-button
    (onClick)="onClick($event)"
    [disabled]="disabled"
    [hidden]="hidden">submit</ln-button>`,
    props
  }))
  .add('ln-button(used for small button scenarios)', () => ({
    template: `<ln-button
    (onClick)="onClick($event)"
    [disabled]="disabled"
    [hidden]="hidden">submit</ln-button>`,
    props
  }))
  .add('ln-button (disabled)', () => ({
    template: `<ln-button
    (onClick)="onClick($event)"
    [disabled]="disabled"
    [hidden]="hidden">submit</ln-button>`,
    props
  }))
  .add('ln-button (hidden)', () => ({
    template: `<ln-button
    (onClick)="onClick($event)"
    [disabled]="disabled"
    [hidden]="hidden">submit</ln-button>`,
    props
  }))
