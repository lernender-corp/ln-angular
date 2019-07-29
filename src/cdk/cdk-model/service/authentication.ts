import { Library, Simple } from '@lernender/core';

export interface IAuthentication extends Simple {
  authority: string;
  authorizationUrl: string;
  baseUrl: string;
  clientId: string;
  issuer: string;
  jwks: string;
  logoutRedirectUrl: string;
  redirectUrl: string;
}

export class Authentication extends Simple implements IAuthentication {
  public jwks: string;
  public authority: string;
  public authorizationUrl: string;
  public baseUrl: string;
  public clientId: string;
  public issuer: string;
  public logoutRedirectUrl: string;
  public redirectUrl: string;
  //
  // Constructor
  //
  constructor();
  constructor(options: object);
  constructor(options?: any) {
    super(options);
    this.jwks = Library.init(options, 'jwks');
    this.authority = Library.init(options, 'authority');
    this.authorizationUrl = Library.init(options, 'authorizationUrl');
    this.baseUrl = Library.init(options, 'baseUrl');
    this.clientId = Library.init(options, 'clientId');
    this.issuer = Library.init(options, 'issuer');
    this.logoutRedirectUrl = Library.init(options, 'logoutRedirectUrl');
    this.redirectUrl = Library.init(options, 'redirectUrl');
    if (Library.hasOwnProperty(options, 'hostname') && Library.isStringWithLength(options.hostname)) {
      if  (Library.isStringWithLength(this.redirectUrl)) {
        this.redirectUrl = this.redirectUrl.replace('{hostname}', options.hostname);
      }
    }
  }
}
