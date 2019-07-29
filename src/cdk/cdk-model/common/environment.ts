import { Library } from '@lernender/core';

export class Environment {
  public get name(): string {
    return this._name;
  }
  public set name(environment) {
    if (Library.isStringWithLength(environment)) {
      this._name = environment.toLowerCase();
    }
  }

  public get label() {
    if (this.name === 'alpha') {
      return 'Alpha';
    } else if (this.name === 'dev' || this.name === 'local') {
      return 'Development';
    } else if (this.name === 'test') {
      return 'Test';
    } else if (this.name === 'uat') {
      return 'UAT';
    } else {
      return '';
    }
  }

  public get color() {
    if (this.name === 'alpha') {
      return 'cyan';
    } else if (this.name === 'dev' || this.name === 'local') {
      return 'purple';
    } else if (this.name === 'test') {
      return 'green';
    } else if (this.name === 'uat') {
      return 'blue';
    } else {
      return 'red';
    }
  }
  public apiPort: string;
  public apiUrl: string;
  public apiPrefix: string;
  public authPort: string;
  public authUrl: string;
  public production: boolean;
  public buildDate: Date;
  public hmr: boolean;
  public pkg: any;
  public security: boolean;
  public version: string;

  private _name: string;


  constructor();

  constructor(options: object);
  constructor(options?: any) {
    this.apiPort = Library.init(options, 'apiPort');
    this.apiPrefix = Library.init(options, 'apiPrefix');
    this.apiUrl = Library.init(options, 'apiUrl');
    this.authPort = Library.init(options, 'authPort');
    this.authUrl = Library.init(options, 'authUrl');
    this.buildDate = Library.init(options, 'buildDate', new Date());
    this.hmr = Library.init(options, 'hmr', false);
    this.name = Library.init(options, 'name', '');
    this.production = Library.init(options, 'production', false);
    this.security = Library.init(options, 'security', false);
    this.version = Library.init(options, 'version', '1.0');
  }

  public isProduction() {
    return this.production;
  }
}
