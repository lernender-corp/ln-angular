import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Endpoint } from '@lernender/core';

export type IMap<T> = (item: any) => T;
export interface ILnHttpService {
  get<T>(endpoint: Endpoint, cb?: IMap<T>, param?: object): Observable<any>;
  put<T>(
    endpoint: Endpoint,
    model: any,
    cb?: IMap<T>,
    param?: object
  ): Observable<any>;
  post<T>(endpoint: Endpoint, model: any, cb?: IMap<T>, param?: object): Observable<any>;
  patch<T>(endpoint: Endpoint, model: any, cb?: IMap<T>): Observable<any>;
  delete<T>(endpoint: Endpoint, cb?: IMap<T>, param?: object): Observable<any>;
}

@Injectable()
export class LnHttpService implements ILnHttpService {
  public get<T>(
    endpoint: Endpoint,
    cb?: IMap<T>,
    params?: any,
    options?: any
  ): Observable<any> {
    return this.http.get(endpoint.compose(), {
      ...options,
      headers: this._getHeader(endpoint),
      params
    });
  }

  public put<T>(
    endpoint: Endpoint,
    model: any,
    cb?: IMap<T>,
    params?: any
  ): Observable<any> {
    return this.http.put(endpoint.compose(), JSON.stringify(model), {
      headers: this._getHeader(endpoint),
      params
    });
  }

  public post<T>(
    endpoint: Endpoint,
    model: any,
    cb?: IMap<T>,
    params?: any
  ): Observable<any> {
    return this.http.post(endpoint.compose(), JSON.stringify(model), {
      headers: this._getHeader(endpoint),
      params
    });
  }

  public patch<T>(
    endpoint: Endpoint,
    model: any,
    cb?: IMap<T>
  ): Observable<any> {
    return this.http.patch(endpoint.compose(), JSON.stringify(model), {
      headers: this._getHeader(endpoint)
    });
  }

  public delete<T>(
    endpoint: Endpoint,
    cb?: IMap<T>,
    params?: any
  ): Observable<any> {
    return this.http.delete(endpoint.compose(), {
      headers: this._getHeader(endpoint),
      params
    });
  }

  //
  // _getHeader_getHeader()
  //
  private _getHeader(endpoint: Endpoint): HttpHeaders {
    let headers: HttpHeaders = new HttpHeaders({
      'content-type':  'application/json'
    }).set('set_token', endpoint.requireToken.toString());
    if (endpoint.hasHeaders()) {
      const customHeaders: { key: string; value: string }[] = endpoint.headers();
      customHeaders.forEach((customHeader: { key: string; value: string }): void => {
        headers = headers.set(customHeader.key, customHeader.value);
      });
    }
    return headers;
  }

  constructor(private http: HttpClient) {}
}
