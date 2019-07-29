import { Library } from '@lernender/core';
import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';

/**
 */
export class CdkDataSource<T> extends DataSource<T> {

  private _data: T[];
  private _cachedPages = new Set<number>();
  private _pageSize: number;
  private _stream: BehaviorSubject<T[]>;
  private _subscription: Subscription;

  /**
   * constructor()
   */
  constructor();
  constructor(options: object);
  constructor(options?: any) {
    super();
    this._subscription = new Subscription();
    this._data = Library.init(options, 'data', []);
    this._pageSize = Library.init(options, 'pageSize', 100);
    this._stream = new BehaviorSubject<T[]>(this._data);
  }

  //
  // Connect View to Data Stream
  //
  public connect(collectionViewer: CollectionViewer): Observable<T[]> {
    this._subscription.add(
      collectionViewer.viewChange.subscribe(range => {
        const start = this.indexedPage(range.start);
        const end = this.indexedPage(range.end - 1);
        for (let i = start; i <= end; i++) {
          this.getPage(i);
        }
      })
    );
    return this._stream;
  }
  //
  // Disconnect View from Data Stream
  //
  public disconnect(): void {
    this._subscription.unsubscribe();
  }

  //
  // indexedPage
  //
  private indexedPage(index: number): number {
    return Math.floor(index / this._pageSize);
  }

  //
  // getPage
  //
  private getPage(page: number) {

    if (this._cachedPages.has(page)) {
      return;
    }

    this._cachedPages.add(page);

    setTimeout(() => {
      /// Send the next page of data
      this._stream.next(this._data);
    }, 25);
  }
}
