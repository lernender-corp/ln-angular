import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, CanLoad } from '@angular/router';

/**
 * Services
 */
import { LnAuthenticationService } from '../ln-authentication';
import { Observable } from 'rxjs';

@Injectable()
export class LnAuthenticationGuardService
  implements CanActivate, CanActivateChild, CanLoad {
  /**
   * canActivate()
   */
  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return this.authenticationService.isAuthenticated();
  }

  /**
   * canActivateChild()
   */
  canActivateChild(): Observable<boolean> | Promise<boolean> | boolean {
    return this.authenticationService.isAuthenticated();
  }

  /**
   * canLoad()
   */
  canLoad(): Observable<boolean> | Promise<boolean> | boolean {
    return true;
  }

  /**
   * constructor()
   */
  constructor(private authenticationService: LnAuthenticationService) {}
}
