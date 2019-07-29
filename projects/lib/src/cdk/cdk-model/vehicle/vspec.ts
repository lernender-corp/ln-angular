import { Audit, Library, Simple } from '@lernender/core';
import { Vehicle } from './vehicle';

const minimumDate: Date = new Date(1970, 0, 1);

export class Vspec extends Simple {

  public custname: string;
  public message: string;
  public token: string;
  public dealerCd: string;
  public audit: Audit;
  public vehicles: Vehicle[];

  public get createdOn(): Date {
    return new Date(this.audit.createdAt);
  }

  public get createdOnFormatted(): string {
    return this.getFormattedDateString(this.audit.createdAt);
  }

  public get expiresOn(): Date {
    if (Library.isDefined(this.audit.expiresAt)) {
      return new Date(this.audit.expiresAt);
    }
    return minimumDate;
  }

  public get expiresOnFormatted(): string {
    return this.getFormattedDateString(this.audit.expiresAt);
  }

  public dateFormatFunction: Function;

  private defaultDateFormatOptions = {
    day: 'numeric',
    year: 'numeric',
    month: 'long'
  };
  private defaultDateFormatLocale = 'en-US';

  private getFormattedDateString(date: string): string {
    let dateToFormat: Date;
    if (Library.isStringWithLength(date)) {
      dateToFormat = new Date(date);
    }
    if (Library.isDefined(this.dateFormatFunction)) {
      return this.dateFormatFunction(dateToFormat);
    } else if (!Library.isStringWithLength(date)) {
      return '';
    }
    return dateToFormat.toLocaleDateString(this.defaultDateFormatLocale, this.defaultDateFormatOptions);
  }

  /*
   * Constructor()
   */
  constructor();

  constructor(options: object);
  constructor(options?: any) {
    super(options);
    this.custname = Library.init(options, 'custname', true);
    this.message = Library.init(options, 'message', true);
    this.token = Library.init(options, 'token', true);
    this.dealerCd = Library.init(options, 'dealerCd');
    this.audit = new Audit(Library.init(options, 'audit', {}));

    this.vehicles = [];
    if (Library.hasOwnProperty(options, 'vehicles')) {
      this.vehicles = options.vehicles.map((o: any) => new Vehicle(o));
    }
  }
}
