export class RecordViewTuple {
  public record: any;
  public view: any;

  constructor();
  constructor(record: any, view: any);
  constructor(record?: any, view?: any) {
    this.record = record;
    this.view = view;
  }
}
