import { join } from 'path';
import { getSubdirectoryNames } from './secondary-entry-points';
import { buildConfig } from './build-config';

/** Method that converts dash-case strings to a camel-based string. */
export const dashCaseToCamelCase =
  (str: string) => str.replace(/-([a-z])/g, (g) => g[1].toUpperCase());

/** Generates rollup entry point mappings for the given package and entry points. */
function generateRollupEntryPoints(packageName: string, entryPoints: string[]):
    {[k: string]: string} {
  return entryPoints.reduce((globals: {[k: string]: string}, entryPoint: string) => {
    globals[`@lernender/${packageName}/${entryPoint}`] =
        `ng.${dashCaseToCamelCase(packageName)}.${dashCaseToCamelCase(entryPoint)}`;
    return globals;
  }, {});
}

/** List of potential secondary entry-points for the cdk package. */
const cdkSecondaryEntryPoints = getSubdirectoryNames(join(buildConfig.packagesDir, 'cdk'));
const commonSecondaryEntryPoints = getSubdirectoryNames(join(buildConfig.packagesDir, 'common'));
const commonFormsEntryPoints = getSubdirectoryNames(join(buildConfig.packagesDir, 'forms'));

/** Object with all cdk entry points in the format of Rollup globals. */
const rollupCdkEntryPoints = generateRollupEntryPoints('cdk', cdkSecondaryEntryPoints);
const rollupCommonEntryPoints = generateRollupEntryPoints('common', commonSecondaryEntryPoints);
const rollupFormsEntryPoints = generateRollupEntryPoints('forms', commonFormsEntryPoints);

/** Map of globals that are used inside of the different packages. */
export const rollupGlobals = {
  'moment': 'moment',
  'tslib': 'tslib',

  '@angular/animations': 'ng.animations',
  '@angular/common': 'ng.common',
  '@angular/common/http': 'ng.common.http',
  '@angular/common/http/testing': 'ng.common.http.testing',
  '@angular/common/testing': 'ng.common.testing',
  '@angular/core': 'ng.core',
  '@angular/core/testing': 'ng.core.testing',
  '@angular/forms': 'ng.forms',
  '@angular/platform-browser': 'ng.platformBrowser',
  '@angular/platform-browser-dynamic': 'ng.platformBrowserDynamic',
  '@angular/platform-browser-dynamic/testing': 'ng.platformBrowserDynamic.testing',
  '@angular/platform-browser/animations': 'ng.platformBrowser.animations',
  '@angular/platform-server': 'ng.platformServer',
  '@angular/router': 'ng.router',

  // Some packages are not really needed for the UMD bundles, but for the missingRollupGlobals rule.
  '@angular/cdk': 'ng.cdk',
  '@angular/cdk/overlay': 'ng.cdk.overlay',
  '@angular/cdk/portal': 'ng.cdk.portal',
  '@angular/cdk/stepper': 'ng.cdk.stepper',
  '@angular/cdk/collections': 'ng.cdk.collections',
  '@angular/cdk/scrolling': 'ng.cdk.scrolling',
  '@angular/cdk/drag-drop': 'ng.cdk.drag-drop',

  // Some packages are not really needed for the UMD bundles, but for the missingRollupGlobals rule.
  '@lernender/core': '@lernender/core/index',
  ...rollupCdkEntryPoints,
  ...rollupCommonEntryPoints,
  ...rollupFormsEntryPoints,
  'lodash-es': 'lodash-es/index',
  'rxjs': 'rxjs',
  'rxjs/operators': 'rxjs.operators'
};
