import { Library } from '@lernender/core';

export class Price {
  public static NA = 'NA';
  public totalDealerInvoice: number;
  public maap: number;
  public baseMsrp: number;
  public optTotalMsrp: number;
  public totalMsrp: number;
  public dph: number;
  public fees: number[];
  public advertizedPrice: number;
  public dealerInvoice: number;
  public dioDealerInvoice: number;
  public dioTotalDealerSellingPrice: number;
  public dioTotalMsrp: number;
  public fuelPrice: number;
  public optDealerInvoice: number;
  public ppoHoldback: number;
  public sellingPrice: number;
  public sellingPriceDiscounted: boolean;
  public tda: number;
  public totalHoldback: number;
  public wfr: number;

  /*
   * Constructor()
   */
  constructor();

  constructor(options: object);
  constructor(options?: any) {
    this.totalDealerInvoice = Library.init(options, 'totalDealerInvoice', 0);
    this.maap = Library.init(options, 'maap', 0);
    this.baseMsrp = Library.init(options, 'baseMsrp', 0);
    this.optTotalMsrp = Library.init(options, 'optTotalMsrp', 0);
    this.totalMsrp = Library.init(options, 'totalMsrp', 0);
    this.dph = Library.init(options, 'dph', 0);
    this.fees = Library.init(options, 'fees', []);
    this.advertizedPrice = Library.init(options, 'advertizedPrice', 0);
    this.dealerInvoice = Library.init(options, 'dealerInvoice', 0);
    this.dioDealerInvoice = Library.init(options, 'dioDealerInvoice', 0);
    this.dioTotalDealerSellingPrice = Library.init(
      options,
      'dioTotalDealerSellingPrice',
      0
    );
    this.dioTotalMsrp = Library.init(options, 'dioTotalMsrp', 0);
    this.fuelPrice = Library.init(options, 'fuelPrice', 0);
    this.optDealerInvoice = Library.init(options, 'optDealerInvoice', 0);
    this.ppoHoldback = Library.init(options, 'ppoHoldback', 0);
    this.sellingPrice = Library.init(options, 'sellingPrice', 0);
    this.sellingPriceDiscounted = Library.init(
      options,
      'sellingPriceDiscounted',
      0
    );
    this.tda = Library.init(options, 'tda', 0);
    this.totalHoldback = Library.init(options, 'totalHoldback', 0);
    this.wfr = Library.init(options, 'wfr', 0);
  }

  public getDealerModelAndAccessoryCost(): number | string {
    let returnValue;
    if (
      Library.isNullOrUndefined(this.dealerInvoice) ||
      Library.isNullOrUndefined(this.optDealerInvoice)
    ) {
      returnValue = Price.NA;
    } else {
      returnValue = this.dealerInvoice + this.optDealerInvoice;
    }
    return returnValue;
  }

  public getRetailModelAndAccessoryCost(): number | string {
    let returnValue;
    if (
      Library.isNullOrUndefined(this.baseMsrp) ||
      Library.isNullOrUndefined(this.optTotalMsrp)
    ) {
      returnValue = Price.NA;
    } else {
      returnValue = this.baseMsrp + this.optTotalMsrp;
    }
    return returnValue;
  }

  public getDealerTotalBasePrice(): number | string {
    let returnValue;
    if (
      Library.isNullOrUndefined(this.dealerInvoice) ||
      Library.isNullOrUndefined(this.optDealerInvoice) ||
      Library.isNullOrUndefined(this.dph) ||
      Library.isNullOrUndefined(this.tda) ||
      Library.isNullOrUndefined(this.fuelPrice)
    ) {
      returnValue = Price.NA;
    } else {
      returnValue =
        this.dealerInvoice +
        this.optDealerInvoice +
        this.dph +
        this.tda +
        this.fuelPrice;
    }
    return returnValue;
  }

  public getRetailTotalBasePrice(): number | string {
    let returnValue;
    if (
      Library.isNullOrUndefined(this.baseMsrp) ||
      Library.isNullOrUndefined(this.optTotalMsrp) ||
      Library.isNullOrUndefined(this.dph)
    ) {
      returnValue = Price.NA;
    } else {
      returnValue = this.baseMsrp + this.optTotalMsrp + this.dph;
    }
    return returnValue;
  }

  public getDealerTotalAccessoryCost(): number | string {
    let returnValue;
    if (Library.isNullOrUndefined(this.optDealerInvoice)) {
      returnValue = Price.NA;
    } else {
      const decimalDealerTotalAccessoryCost = this.optDealerInvoice;
      returnValue = decimalDealerTotalAccessoryCost;
    }
    return returnValue;
  }

  public getRetailTotalAccessoryCost(): number | string {
    let returnValue;
    if (Library.isNullOrUndefined(this.optTotalMsrp)) {
      returnValue = Price.NA;
    } else {
      returnValue = this.optTotalMsrp;
    }
    return returnValue;
  }

  public getDestinationCharge(): number | string {
    let returnValue;
    if (Library.isNullOrUndefined(this.dph)) {
      returnValue = Price.NA;
    } else {
      returnValue = this.dph;
    }
    return returnValue;
  }

  public getTDACharge(): number | string {
    let returnValue;
    if (Library.isNullOrUndefined(this.tda)) {
      returnValue = Price.NA;
    } else {
      returnValue = this.tda;
    }
    return returnValue;
  }

  public getGasolineCharge(): number | string {
    let returnValue;
    if (Library.isNullOrUndefined(this.fuelPrice)) {
      returnValue = Price.NA;
    } else {
      returnValue = this.fuelPrice;
    }
    return returnValue;
  }

  public getAdvertizedPrice(): number | string {
    let returnValue;
    if (Library.isNullOrUndefined(this.advertizedPrice)) {
      returnValue = Price.NA;
    } else {
      returnValue = this.advertizedPrice;
    }
    return returnValue;
  }

  public getSellingPrice(): number | string {
    let returnValue;
    if (Library.isNullOrUndefined(this.sellingPrice)) {
      returnValue = Price.NA;
    } else {
      returnValue = this.sellingPrice;
    }
    return returnValue;
  }

  public getAdjustment(): number | string {
    let returnValue;
    if (
      this.getSellingPrice() === Price.NA ||
      this.getRetailTotalBasePrice() === Price.NA
    ) {
      returnValue = Price.NA;
    } else if (Library.isNullOrUndefined(this.dioTotalMsrp)) {
      returnValue = this.totalMsrp - this.sellingPrice;
    } else {
      returnValue = this.totalMsrp + this.dioTotalMsrp - this.sellingPrice;
    }
    return returnValue;
  }
}
