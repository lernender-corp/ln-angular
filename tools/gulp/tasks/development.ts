import {task, dest} from 'gulp';
import {tsBuildTask, copyTask, serverTask} from '../util/task_helpers';
import {join} from 'path';
import {
  buildConfig,
  buildScssPipeline,
  copyFiles,
  inlineResourcesForDirectory,
  sequenceTask,
  watchFiles,
} from 'lernender-angular-build-tools';
import {
  commonPackage
} from '../packages';

const {outputDir, packagesDir, projectDir} = buildConfig;

/** Path to the directory where all bundles live. */
const bundlesDir = join(outputDir, 'bundles');

const appDir = join(packagesDir, 'demo-app');
const outDir = join(outputDir, 'packages', 'demo-app');

/** Array of vendors that are required to serve the demo-app. */
const appVendors = [
  '@angular',
  'systemjs',
  'zone.js',
  'rxjs',
  'hammerjs',
  'core-js',
  'moment',
  'tslib',
  '@webcomponents',
];

/** Glob that matches all required vendors for the demo-app. */
const vendorGlob = `+(${appVendors.join('|')})/**/*.+(html|css|js|map)`;

/** Glob that matches all assets that need to be copied to the output. */
const assetsGlob = join(appDir, `**/*.+(html|css|svg|ico)`);

/** Path to the demo-app tsconfig file. */
const tsconfigPath = join(appDir, 'tsconfig-build.json');

task(':build:devapp:ts', tsBuildTask(tsconfigPath));
task(':build:devapp:assets', copyTask(assetsGlob, outDir));
task(':build:devapp:scss', () => buildScssPipeline(appDir).pipe(dest(outDir)));
task(':build:devapp:inline-resources', () => inlineResourcesForDirectory(outDir));

task(':serve:devapp', serverTask(outDir, true));

task('build:devapp', sequenceTask(
  'cdk:build-no-bundles',
  'angular:build-no-bundles',
  [':build:devapp:assets', ':build:devapp:scss', ':build:devapp:ts'],
  ':build:devapp:inline-resources',
));

task('serve:devapp', ['build:devapp'], sequenceTask([':serve:devapp', ':watch:devapp']));

/*
 * Development app watch task. This task ensures that only the packages that have been affected
 * by a file-change are being rebuilt. This speeds-up development and makes working on Angular
 * easier.
 */

task(':watch:devapp', () => {
  watchFiles(join(appDir, '**/*.ts'), [':build:devapp:ts']);
  watchFiles(join(appDir, '**/*.scss'), [':watch:devapp:rebuild-scss']);
  watchFiles(join(appDir, '**/*.html'), [':watch:devapp:rebuild-html']);

  // Custom watchers for all packages that are used inside of the demo-app. This is necessary
  // because we only want to build the changed package (using the build-no-bundles task).

  // CDK package watchers.
  watchFiles(join(commonPackage.sourceDir, '**/*'), ['cdk:build-no-bundles']);

  const angularCoreThemingGlob = join(commonPackage.sourceDir, '**/core/theming/**/*.scss');

  // Angular package watchers.
  watchFiles([
    join(commonPackage.sourceDir, '**/!(*-theme.scss)'), `!${angularCoreThemingGlob}`
  ], ['angular:build-no-bundles']);
  watchFiles([
    join(commonPackage.sourceDir, '**/*-theme.scss'), angularCoreThemingGlob
  ], [':build:devapp:scss']);
});

// Note that we need to rebuild the TS here, because the resource inlining
// won't work if the file's resources have been inlined already.
task(':watch:devapp:rebuild-scss', sequenceTask([':build:devapp:scss', ':build:devapp:ts'],
   ':build:devapp:inline-resources'));

task(':watch:devapp:rebuild-html', sequenceTask([':build:devapp:assets', ':build:devapp:ts'],
  ':build:devapp:inline-resources'));
