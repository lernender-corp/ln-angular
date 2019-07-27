import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class LnJsonService {
  /**
   * Function: get()
   * @funciton
   */
  public get(file: string): Observable<any> {
    return this.httpClient.get(file);
  }

  /**
   * Function: constructor()
   */
  constructor(private httpClient: HttpClient) {}
}
