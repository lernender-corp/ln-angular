import { Library } from '@lernender/core';

export class StandardOption {
  public safetyAndConvenience: string[];
  public mechanicalAndPerformance: string[];
  public interior: string[];
  public exterior: string[];
  /*
   * Constructor()
   */
  constructor();

  constructor(options: object);
  constructor(options?: any) {
    this.safetyAndConvenience = Library.init(
      options,
      'safetyAndConvenience',
      []
    );
    this.mechanicalAndPerformance = Library.init(
      options,
      'mechanicalAndPerformance',
      []
    );
    this.interior = Library.init(options, 'interior', []);
    this.exterior = Library.init(options, 'exterior', []);
  }
}
