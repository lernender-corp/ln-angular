import { ChangeIndicator } from './change-indicator';
import { Library, Simple } from '@lernender/core';
import { Engine } from './engine';
import { ExteriorColor } from './exteriorColor';
import { InteriorColor } from './interiorColor';
import { Media } from './media';
import { Model } from './model';
import { MPG } from './mpg';
import { Option } from './option';
import { Price } from './price';
import { Promote } from './promote';
import { SafetyRating } from './safetyRating';
import { StandardOption } from './standard-option';
import { Transmission } from './transmission';
import { Flags } from './flags';

export class Vehicle extends Simple {
  public get calculatedDaysInStock(): number {
    let daysInStock: string = '0';
    let vindaysInStock: string = this.daysInStock;
    let vinInvoiceDate: string = Library.isUndefined(this.invoiceDate)
      ? null
      : this.invoiceDate.toString();
    const vinVehicleTradedDate: string = Library.isUndefined(
      this.vehicleTradedDate
    )
      ? null
      : this.vehicleTradedDate.toString();
    const todaysDate: any = new Date();
    if (this.dealerCategory === 'G') {
      if (isNaN(parseInt(vindaysInStock, 0))) {
        vindaysInStock = '0';
      }
      if (
        Library.isStringWithLength(vinInvoiceDate) &&
        vinInvoiceDate.toLowerCase() !== 'null' &&
        vinInvoiceDate.indexOf(':') === -1
      ) {
        vinInvoiceDate = vinInvoiceDate + 'T00:00:00';
      }
      if (
        Library.isStringWithLength(vinInvoiceDate) &&
        vinInvoiceDate.toLowerCase() !== 'null' &&
        Library.isStringWithLength(vinVehicleTradedDate) &&
        vinVehicleTradedDate.toLowerCase() !== 'null' &&
        new Date(vinInvoiceDate) > new Date(vinVehicleTradedDate)
      ) {
        daysInStock = Math.floor(
          (<any>this.getPSTTime(todaysDate) - <any>new Date(vinInvoiceDate)) /
            (1000 * 3600 * 24) +
            parseInt(vindaysInStock, 0)
        ).toString();
      } else if (
        Library.isStringWithLength(vinVehicleTradedDate) &&
        vinVehicleTradedDate.toLowerCase() !== 'null'
      ) {
        daysInStock = Math.floor(
          (<any>this.getPSTTime(todaysDate) -
            <any>this.getPSTTime(new Date(vinVehicleTradedDate))) /
            (1000 * 3600 * 24) +
            parseInt(vindaysInStock, 0)
        ).toString();
      } else if (
        Library.isStringWithLength(vinInvoiceDate) &&
        vinInvoiceDate.toLowerCase() !== 'null'
      ) {
        daysInStock = Math.floor(
          (<any>this.getPSTTime(todaysDate) - <any>new Date(vinInvoiceDate)) /
            (1000 * 3600 * 24) +
            parseInt(vindaysInStock, 0)
        ).toString();
      }
    }
    return parseInt(daysInStock, null);
  }
  public isNew(): boolean {
    let isNewVehicle: boolean = false;
    if (!Library.isUndefined(this.vehicleTradedDate)) {
      isNewVehicle = Library.isWithin24Hours(this.vehicleTradedDate);
    } else if (!Library.isUndefined(this.createdAtDate)) {
      isNewVehicle = Library.isWithin24Hours(this.createdAtDate);
    }
    return isNewVehicle;
  }
  public activityStatus?: string;
  public allocationNbr?: string;
  public bodyStyleDesc: string;
  public brand: string;
  public category: string;
  public changeIndicators: ChangeIndicator[];
  public checkCode?: string;
  public comments: string;
  public createdAtDate?: Date;
  public daysInStock: any;
  public dealerCategory: string;
  public dealerCd: string;
  public dealerSubCategory: string;
  public dio: object;
  public disclaimer: string[];
  public engine: Engine;
  public extColor: ExteriorColor;
  public flags: Flags;
  public grade?: string;
  public holdStatus: string;
  public intColor: InteriorColor;
  public invoiceDate?: Date;
  public lastOfflineDate?: Date;
  public lastPromotedDate?: Date;
  public locationDesc?: string;
  public marketingSeries: string;
  public media: Media[];
  public model: Model;
  public mpg: MPG;
  public options: Option[];
  public prevDealerCd?: string;
  public previousDaysOnline?: number;
  public price: Price;
  public promoteDescription: Promote;
  public rdrStatus: string;
  public reserve: boolean;
  public reserveFlag?: boolean;
  public safetyRating: SafetyRating;
  public serialNbr?: string;
  public seriesCode: string;
  public standardOptions: StandardOption;
  public stockNum: string;
  public tempSerialNbr?: string;
  public transmission: Transmission;
  public unitId: string;
  public vehOrderNum?: string;
  public vehicleTradedDate?: Date;
  public vin: string;
  public visible: boolean;
  public weightRating: string;
  public wholesaleDealerCd?: string;
  public year: number;
  /*
   * Constructor()
   */
  constructor();

  constructor(options: object);
  constructor(options?: any) {
    super(options);
    this.activityStatus = Library.init(options, 'activityStatus', '');
    this.allocationNbr = Library.init(options, 'allocationNbr', '');
    this.bodyStyleDesc = Library.init(options, 'bodyStyleDesc');
    this.brand = Library.init(options, 'brand');
    this.category = Library.init(options, 'category', '');
    this.changeIndicators = Library.hasOwnProperty(options, 'changeIndicators')
      ? options.changeIndicators.map(o => new ChangeIndicator(o))
      : [];
    this.checkCode = Library.init(options, 'checkCode', '');
    this.comments = Library.init(options, 'comments', '');
    this.createdAtDate = Library.init(options, 'createdAt');
    if (!Library.isUndefined(this.createdAtDate)) {
      this.createdAtDate = new Date(this.createdAtDate);
    }
    this.daysInStock = Library.init(options, 'daysInStock', 0);
    this.dealerCategory = Library.init(options, 'dealerCategory');
    this.dealerCd = Library.init(options, 'dealerCd');
    this.dealerSubCategory = Library.init(options, 'dealerSubCategory');
    this.dio = Library.init(options, 'dio', {});
    this.disclaimer = Library.hasOwnProperty(options, 'disclaimer')
      ? options.disclaimer
      : [];
    this.engine = new Engine(Library.init(options, 'engine', {}));
    this.extColor = new ExteriorColor(Library.init(options, 'extColor', {}));
    this.flags = new Flags(Library.init(options, 'flags', {}));
     this.grade = Library.init(options, 'grade', '');
    this.intColor = new InteriorColor(Library.init(options, 'intColor', {}));
    this.invoiceDate = Library.init(options, 'invoiceDate');
    if (!Library.isUndefined(this.invoiceDate)) {
      this.invoiceDate = new Date(this.invoiceDate);
    }
    this.lastOfflineDate = Library.init(options, 'lastOfflineDate');
    if (!Library.isUndefined(this.lastOfflineDate)) {
      this.lastOfflineDate = new Date(this.lastOfflineDate);
    }
    this.lastPromotedDate = Library.init(options, 'lastPromotedDate');
    if (!Library.isUndefined(this.lastPromotedDate)) {
      this.lastPromotedDate = new Date(this.lastPromotedDate);
    }
    this.locationDesc = Library.init(options, 'locationDate', '');
    this.marketingSeries = Library.init(options, 'marketingSeries');
    this.media = Library.hasOwnProperty(options, 'media')
      ? options.media.map(o => new Media(o))
      : [];
    this.model = new Model(Library.init(options, 'model', {}));
    this.mpg = new MPG(Library.init(options, 'mpg', {}));
    this.options = Library.hasOwnProperty(options, 'options')
      ? options.options.map(o => new Option(o))
      : [];
    this.prevDealerCd = Library.init(options, 'prevDealerCd', '');
    this.previousDaysOnline = Library.init(options, 'previousDaysOnline', 0);
    this.price = new Price(Library.init(options, 'price', {}));
    this.promoteDescription = new Promote(
      Library.init(options, 'promoteDescription', {})
    );
    this.rdrStatus = Library.init(options, 'rdrStatus', '');
    this.reserve = Library.init(options, 'reserve');
    this.reserveFlag = Library.init(options, 'reserveFlag');
    this.safetyRating = new SafetyRating(
      Library.init(options, 'safetyRating', {})
    );
    this.serialNbr = Library.init(options, 'serialNbr', '');
    this.seriesCode = Library.init(options, 'seriesCode');
    this.standardOptions = new StandardOption(
      Library.init(options, 'standardOptions', {})
    );
    this.stockNum = Library.init(options, 'stockNum', '');
    this.tempSerialNbr = Library.init(options, 'tempSerialNbr', '');
    this.transmission = new Transmission(
      Library.init(options, 'transmission', {})
    );
    this.vehOrderNum = Library.init(options, 'vehOrderNum', '');
    this.vehicleTradedDate = Library.init(options, 'vehicleTradedDate');
    if (!Library.isUndefined(this.vehicleTradedDate)) {
      this.vehicleTradedDate = new Date(this.vehicleTradedDate);
    }
    this.unitId = Library.init(options, 'unitId');
    this.vin = Library.init(options, 'vin');
    this.visible = Library.init(options, 'visible', true);
    this.weightRating = Library.init(options, 'weightRating');
    this.wholesaleDealerCd = Library.init(options, 'wholesaleDealerCd', '');
    this.year = Library.init(options, 'year', 0);
  }
  private getPSTTime(date: Date): Date {
    return new Date(
      date.getUTCFullYear(),
      date.getUTCMonth(),
      date.getUTCDate(),
      date.getUTCHours() - 8,
      date.getUTCMinutes(),
      date.getUTCSeconds()
    );
  }
}
