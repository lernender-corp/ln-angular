import {task} from 'gulp';
import {createPackageBuildTasks, sequenceTask} from 'lernender-angular-build-tools';

import { allBuildPackages, cdkPackage, commonPackage, formsPackage } from './packages';

createPackageBuildTasks(cdkPackage);
createPackageBuildTasks(commonPackage);
createPackageBuildTasks(formsPackage);

import './tasks/aot';
import './tasks/clean';
import './tasks/default';
import './tasks/lint';
// import './tasks/lernender-release';

/** Task that builds all available release packages. */
task('build-release-packages', sequenceTask(
  'clean',
  allBuildPackages.map(buildPackage => `${buildPackage.name}:build-release`)
));
