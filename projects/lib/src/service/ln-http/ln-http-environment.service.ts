import { Injectable, Inject, OnDestroy } from '@angular/core';
import { Library, Endpoint, Constant } from '@lernender/core';
import {
  ILnHttpEnvironmentSettings,
  TM_HTTP_ENVIRONMENT_CONFIG
} from './ln-http-environment.provider';
import {
  Environment
} from '../../cdk/cdk-model/service/environment';
import {
  Dictionary
} from '../../cdk/cdk-model/generic/dictionary';
import { Authentication } from '../../cdk/cdk-model/service/authentication';
//
// Window Reference
//
declare var window: any;

@Injectable({
  providedIn: 'root'
})
export class LnHttpEnvironmentService
  implements ILnHttpEnvironmentSettings, OnDestroy {
  //
  // Public getters
  //
  public get uid(): string { return this._environment.uid; }
  public get description(): string { return this._environment.description; }
  public get name(): string { return this._environment.name; }
  public get type(): Constant.Environment { return this._environment.type; }
  public get hostname(): Endpoint { return this._environment.hostname; }
  public get authentication(): Authentication { return this._environment.authentication; }

  public get api(): Endpoint { return this._environment.api; }
  public get dis(): Endpoint { return this._environment.dis; }
  public get media(): Endpoint { return this._environment.media; }
  public get microMedia(): Endpoint { return this._environment.microMedia; }
  public get public(): Endpoint { return this._environment.public; }

  public isSSL(): boolean { return this._environment.isSSL(); }

  //
  // getUrl()
  //
  public getUrl(key: string): Endpoint {
    return this._environment.getUrl(key);
  }

  //
  // getTag()
  //
  public getTag(key: string): string | boolean {
    return this._environment.getTag(key);
  }

  //
  // Private Variables
  //
  private _environment: Environment;

  //
  // ngOnDestroy()
  //
  public ngOnDestroy() {}
  //
  // Constructor()
  //
  constructor(@Inject(TM_HTTP_ENVIRONMENT_CONFIG) environments: any) {
    //
    // Init hostname
    //
    let hostname: any = null;
    this._environment = new Environment({
      hostname: {
        url: 'localhost',
        secure: false
      }
    });
    //
    // Extract Host Name
    //
    if (
      Library.isDefined(window.location) &&
      Library.hasOwnProperty(window, 'location') &&
      Library.hasOwnProperty(window.location, 'hostname')
    ) {
      hostname = window.location.hostname.toLowerCase();
    }
    //
    // If we have a host name
    //
    if (Library.isStringWithLength(hostname)) {
      //
      // Persist the environments
      //
      if (Library.isArrayWithLength(environments)) {
        const list = environments.map(env => new Environment(env));

        try {
          //
          // Find Enviroment based on Hostname
          //
          const idx = list.findIndex(
            env => env.hostname.url.toLowerCase() === hostname
          );
          if (idx > -1) {
            this._environment = list[idx];
          }
        } catch (err) {
          throw `Attempted to access an invalid set of environment variables: ${hostname}`;
        }
      }
    }
  }
}
