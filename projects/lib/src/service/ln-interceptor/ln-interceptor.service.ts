import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Guid } from '@lernender/core';
import { Observable } from 'rxjs';

import { LnAuthenticationService } from '../ln-authentication';

@Injectable()
export class LnInterceptorService implements HttpInterceptor {
  //
  // intercept
  //
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const requireToken: boolean = request.headers.has('set_token')
      ? request.headers.get('set_token').toLowerCase() === 'true'
      : false;

    //
    // Remove Header
    //
    const headers = request.headers.delete('set_token');
    let headersToSet = {};
    //
    // Set the Authorization Header
    //
    if (requireToken) {
      if (this.authenticationService.hasToken()) {
        headersToSet = {
          Authorization: `Bearer ${this.authenticationService.token}`,
          'X-B3-TraceId': `${Guid.UUID()}`,
          'X-B3-SpanId': `${Guid.UUID()}`
        };
      }
    }
    request = request.clone({
      headers,
      setHeaders: headersToSet
    });
    return next.handle(request);
  }

  /**
   * constructor()
   */
  constructor(private authenticationService: LnAuthenticationService) {}
}
