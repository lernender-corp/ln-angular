import { BuildPackage, buildConfig } from 'lernender-angular-build-tools';
import { join } from 'path';
//
// cdk Package
//
export const cdkPackage = new BuildPackage('cdk');
cdkPackage.exportsSecondaryEntryPointsAtRoot = true;
cdkPackage.sourceDir = join(buildConfig.packagesDir, 'cdk');
//
// Common Package
//
export const commonPackage = new BuildPackage('common', [cdkPackage]);
commonPackage.exportsSecondaryEntryPointsAtRoot = true;
commonPackage.sourceDir = join(buildConfig.packagesDir, 'common');

/** List of all build packages defined for this project. */
export const allBuildPackages = [
  cdkPackage
];

