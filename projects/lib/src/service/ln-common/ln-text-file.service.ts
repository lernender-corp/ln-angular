import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class LnTextFileService {
  /**
   * Function: get()
   */
  public get(file: string): Observable<any> {
    return this.httpClient.get(file, {
      responseType: 'text'
    });
  }

  /**
   * Function: constructor()
   */
  constructor(private httpClient: HttpClient) {}
}
