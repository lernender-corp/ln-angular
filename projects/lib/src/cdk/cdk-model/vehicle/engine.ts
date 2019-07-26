import { Library } from '@lernender/core';

export class Engine {
  public engineCd: string;
  public name: string;
  public noOfCylinders: string;
  public horsepower: string;
  public fuelType: string;
  public engineNbr: string;
  public engineSource: string;
  /*
   * Constructor()
   */
  constructor();

  constructor(options: object);
  constructor(options?: any) {
    this.engineCd = Library.init(options, 'engineCd');
    this.name = Library.init(options, 'name');
    this.noOfCylinders = Library.init(options, 'noOfCylinders');
    this.horsepower = Library.init(options, 'horsepower');
    this.fuelType = Library.init(options, 'fuelType');
    this.engineNbr = Library.init(options, 'engineNbr');
    this.engineSource = Library.init(options, 'engineSource');
  }
}
