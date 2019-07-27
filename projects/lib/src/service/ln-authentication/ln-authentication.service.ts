// import { Cookie, CookieOption, Token, Library } from '@lernender/core';
import { Token, Library } from '@lernender/core';
import { Inject, Injectable } from '@angular/core';
import { AuthenticationConfig } from '../../cdk';
import {
  AUTH_CONFIG,
  defaultAuthenticationConfig
} from './ln-authentication.service.provider';
//
// Window Reference
//
declare var window: Window;

@Injectable({
  providedIn: 'root'
})
export class LnAuthenticationService {
  //
  // Callback Function
  //
  public startSigninMainWindow: (url: string) => void;
  public endSigninMainWindow: (url: string) => Promise<any>;
  public getUser: () => Promise<any>;
  public initializeUser: (user: any) => any;
  public isUserAuthorized: () => boolean;
  public decodeJwtToken: (token: string) => any;
  public scheduleRefreshToken: (exp) => void;
  public redirectAfterAuthentication: (url: string) => void;
  public logOut: () => void;

  // Constant for Refresh Token Invoked
  static REFRESH_TOKEN_INVOKED: string = 'refreshTokenInvoked';
  // Constant for Time to refresh token => min * seconds * milliseconds
  static REFRESH_TOKEN_TIME_PERIOD: number = 55 * 60 * 1000; // => 55 min
  // Constant for Time to verify if token is refreshed => min * seconds * milliseconds
  static REFRESH_TOKEN_VERIFICATION_TIME_PERIOD: number = 60 * 60 * 1000; // => 60 min
  // Constant for Time to logout => hours * min * seconds * milliseconds
  static LOGOUT_PERIOD: number = 8 * 60 * 60 * 1000; // => 8 hrs
  static ID_TOKEN_HTTP_CLIENT: string = 'id_token';
  //
  // Private Variables
  //
  // private _cookie: Cookie;
  // private _cookieOption: CookieOption;
  // private _userRoles: string;
  private _token: Token;
  private _user: any;
  private _loggedIn: boolean;
  private _config: AuthenticationConfig;
  public originalRouteURL: string;

  //
  // user()
  //
  public hasToken(): boolean {
    return (
      !Library.isNullOrUndefined(this._token) &&
      Library.isStringWithLength(this._token.token)
    );
  }

  //
  // token()
  //
  public get token(): any {
    return this._token.token;
  }
  //
  // user()
  //
  public get user(): any {
    return this._user;
  }

  //
  // Method to get user roles from token()
  //
  public get userRoles(): string[] {
    if (this.hasProfile()
    && !Library.isNullOrUndefined(this._user.profile.roles)) {
      return this._user.profile.roles.split(/,/g);
    } else {
      return [];
    }
  }


  //
  // getUsername()
  //
  public getUsername(format: string = 'PREFERRED_NAME | DEALERCD'): string {
    let _username = '';

    try {
      if (this.hasProfile()) {
        _username = format
          .replace(/PREFERRED_NAME/g, this._user.profile.preferred_name)
          .replace(/DEALERCD/g, this._user.dealerCd);
      }
    } catch {}

    return _username;
  }
  //
  // hasUser()
  //
  public hasUser(): boolean {
    return Library.isObject(this.user);
  }
  //
  // hasProfile()
  //
  public hasProfile(): boolean {
    return this.hasUser() && Library.hasOwnProperty(this._user, 'profile');
  }
  //
  // dealerCode()
  //
  public get dealerCode(): string {
    return this.hasUser() ? this.user.dealerCd : '';
  }
  //
  // isAuthenticated()
  //
  public isAuthenticated(): boolean {
    // restore the token from the session storage
    if (!this.hasToken()) {
      let t = window.sessionStorage.getItem(
        LnAuthenticationService.ID_TOKEN_HTTP_CLIENT
      );
      if (!Library.isNullOrUndefined(t)) {
        this.updateRenewedToken(t);
        if (this._loggedIn) {
          // this.scheduleRefreshToken((new Date().getTime() + (10 * 60 * 1000)) / 1000);
          this.scheduleRefreshToken(this._user.profile.exp);
        }
      }
    }
    this._loggedIn = !this._tokenExpired();
    return this._loggedIn;
  }
  public updateRenewedToken(idToken: string) {
    this._token = new Token({
      token: idToken
    });

    // Update the user from the token
    if (Library.isFunction(this.decodeJwtToken)) {
      this._user = {
        profile: this.decodeJwtToken(idToken)
      };
    }

    if (Library.isFunction(this.initializeUser)) {
      this._user = this.initializeUser(this._user);
    }
    this._loggedIn = !this._tokenExpired();
  }
  //
  // handleAuthentication()
  //
  public handleAuthentication(): void {
    if (this._loggedIn) {
    } else {
      //
      // Signin process has returned we need to then finished
      // the signin process to receive a user.
      //
      if (Library.isFunction(this.getUser)) {
        //
        // Ask Parent for the current user
        //
        this.getUser()
          .then(user => {
            if (!Library.isUndefined(user)) {
              this._loggedIn = false;
              this._silentLogin();
            } else {
              //
              // Call Parent to initialise User profile (i.e. Update User's Dealer Code)
              //
              if (Library.isFunction(this.initializeUser)) {
                this._user = this.initializeUser(user);
              }
            }
          })
          .catch(() => {
            this._silentLogin();
          });
      }
    }
  }

  private _silentLogin() {
    if (!(window.location.href.indexOf('state') > -1)) {
      window.sessionStorage.clear();
      window.localStorage.removeItem(
        LnAuthenticationService.REFRESH_TOKEN_INVOKED
      );
      window.sessionStorage.setItem('originalUrl', window.location.href);
      window.sessionStorage.setItem('baseUrl', this._config.baseUrl);
      //
      // Define the originalRouteURL
      //
      this.originalRouteURL = window.location.href;

      if (Library.isFunction(this.startSigninMainWindow)) {
        //
        // Start Sign-in Process
        //
        this.startSigninMainWindow(window.location.href);
      }
    } else {
      let urlFragment =
        this.originalRouteURL + decodeURIComponent(window.location.hash);
      //
      // Signin process has returned we need to then finished
      // the signin process to receive a user.
      //
      if (Library.isFunction(this.endSigninMainWindow)) {
        //
        // Finish the sign in process
        //
        this.endSigninMainWindow(urlFragment).then(() => {
          //
          // Signin process has returned we need to then finished
          // the signin process to receive a user.
          //
          if (Library.isFunction(this.getUser)) {
            //
            // Ask Parent for the current user
            //
            this.getUser().then(user => {
              //
              // Update Logged In Status
              //
              this._loggedIn = !Library.isUndefined(user);
              //
              // If we have a valid user object then assume we are logged in
              //
              if (this._loggedIn) {
                //
                // Update the current user
                //
                if (Library.isFunction(this.updateRenewedToken)) {
                  this.updateRenewedToken(user.id_token);
                }
                //
                // Call Parent to initialise User profile (i.e. Update User's Dealer Code)
                //
                // if (Library.isFunction(this.initializeUser)) {
                //   this._user = this.initializeUser(this._user);
                // }
                this.originalRouteURL = window.sessionStorage.getItem(
                  'originalUrl'
                );

                if (Library.isFunction(this.isUserAuthorized)) {
                  if (this.isUserAuthorized()) {
                    if (Library.isFunction(this.scheduleRefreshToken)) {
                      // this.scheduleRefreshToken((new Date().getTime()
                      // + (10 * 60 * 1000)) / 1000);
                      this.scheduleRefreshToken(this._user.profile.exp);
                    }
                    window.sessionStorage.setItem(
                      LnAuthenticationService.ID_TOKEN_HTTP_CLIENT,
                      this._getQueryStringValue(
                        urlFragment,
                        LnAuthenticationService.ID_TOKEN_HTTP_CLIENT
                      )
                    );

                    this._token = new Token({
                      token: window.sessionStorage.getItem(
                        LnAuthenticationService.ID_TOKEN_HTTP_CLIENT
                      )
                    });

                    if (Library.isFunction(this.redirectAfterAuthentication)) {
                      this.redirectAfterAuthentication(this.originalRouteURL);
                    }
                  }
                }
              } else {
                this._loggedIn = false;
              }
            });
          }
        });
      }
    }
  }

  private _tokenExpired(): boolean {
    if (!this.hasProfile() || !this._token.hasToken()) {
      return true;
    } else {
      let expiryDate = new Date(
        new Date(0).setUTCSeconds(this._user.profile.exp)
      );
      let currentDate = new Date();
      return !(expiryDate > currentDate);
    }
  }

  private _getQueryStringValue(url: string, key: string) {
    return decodeURIComponent(
      url.replace(
        new RegExp(
          '^(?:.*[&\\?]' +
            encodeURIComponent(key).replace(/[\.\+\*]/g, '\\$&') +
            '(?:\\=([^&]*))?)?.*$',
          'i'
        ),
        '$1'
      )
    );
  }

  constructor(@Inject(AUTH_CONFIG) config: AuthenticationConfig) {
    // this._cookie = new Cookie();
    // this._cookieOption = new CookieOption();
    // this._userRoles = '';
    this._config = { ...defaultAuthenticationConfig, ...config };
    this._loggedIn = false;
  }
}
