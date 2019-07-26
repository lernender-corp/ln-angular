import { Library, Action } from '@lernender/core';

export class FeatureConfig extends Action {
  public name: string;
  public displayName: string;
  public description: string;
  public active: boolean;

  /*
   * Constructor()
   */

  constructor();

  constructor(options: object);
  constructor(options?: any) {
    super(options);
    this.name = Library.init(options, 'name');
    this.displayName = Library.init(options, 'displayName');
    this.description = Library.init(options, 'description');
    this.active = Library.init(options, 'active');
  }
}
