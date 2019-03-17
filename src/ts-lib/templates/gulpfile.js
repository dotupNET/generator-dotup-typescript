/**
 * Welcome to your gulpfile!
 * The gulp tasks are split in several files in the gulp directory for better modularity.
 */
var gulp = require('gulp'),
  path = require('path'),
  // debug = require('gulp-debug'),
  // inject = require('gulp-inject'),
  tsc = require('gulp-typescript'),
  tslint = require('gulp-tslint'),
  mocha = require('gulp-mocha'),
  sourcemaps = require('gulp-sourcemaps'),
  del = require('del'),
  Config = require('./gulpfile.config'),
  tsProject = tsc.createProject('tsconfig.json'),
  ghPages = require('gulp-gh-pages')
  ;
// browserSync = require('browser-sync'),
// superstatic = require('superstatic');

var config = new Config();

/**
 * Lint all custom TypeScript files.
 */
gulp.task('ts-lint', function () {
  return gulp
    .src(config.allTypeScript)
    .pipe(tslint())
    .pipe(tslint.report('prose'))
    ;
});

/**
 * Compile TypeScript and include references to library and app .d.ts files.
 */
gulp.task('compile-ts', function () {
  // var sourceTsFiles = [
  //   config.tsSourceFiles
  // ];

  var tsResult = tsProject.src()
    .pipe(sourcemaps.init())
    .pipe(tsProject());

  tsResult.dts.pipe(gulp.dest(config.targetPath));

  return tsResult.js
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(config.targetPath))
    ;
});

gulp.task('copy-assets', function () {
  return gulp
    .src(`${config.sourcePath}/assets/**`, { dot: true })
    .pipe(gulp.dest(`${config.targetPath}/assets/`))
    ;
});

gulp.task('copy-templates', function () {
  return gulp
    .src(`${config.sourcePath}/**/templates/**`, { dot: true })
    .pipe(gulp.dest(`${config.targetPath}/`))
    ;
});

/**
 * Remove all generated JavaScript files from TypeScript compilation.
 */
gulp.task('clean-target', function () {
  var allFiles = [
    path.join(config.targetPath)
  ];
  // delete the files
  return del(allFiles);
});

gulp.task('clean-assets', function () {
  return del([`${config.targetPath}/assets`]);
});

gulp.task('build',
  gulp.series(
    'clean-target',
    'copy-assets',
    'compile-ts',
    'copy-templates'
  )
);

gulp.task('watch-src', function () {
  return gulp.watch([config.tsSourceFiles], gulp.series('compile-ts'));
});

gulp.task('watch-assets', function () {
  return gulp.watch([`${config.sourcePath}/assets`],
    gulp.series('clean-assets', 'copy-assets')
  );
});

gulp.task('watch', gulp.parallel('watch-assets', 'watch-src'), function (done) {
  done();
});

gulp.task('test-mocha', function () {
  return gulp.src(config.testPath)
    .pipe(mocha(
      {
        reporter: 'spec',
        require: ['ts-node/register']
      }
    ))
    ;
});

gulp.task("typedoc", function () {
  return gulp
    .src([config.tsSourceFiles])
    .pipe(typedoc({
      // TypeScript options (see typescript docs)
      module: "commonjs",
      target: "es2017",
      includeDeclarations: true,
      exclude: "**/*+(index|.spec|.test|.e2e).ts",
      // Output options (see typedoc docs)
      out: config.docsPath,

      // TypeDoc options (see typedoc docs)
      mode: "file",
      ignoreCompilerErrors: false,
      version: true,
    }))
    ;
});

gulp.task('docs-publish', function () {
  return gulp.src(config.docsFiles)
    .pipe(ghPages());
});

// Load all gulp files.
// fs.readdirSync('./tools/gulp').filter(function(file) {
//   return (/\.(js)$/i).test(file);
// }).map(function(file) {
//   require('./tools/gulp/' + file);
// });




///////////////////////////

// const gulp = require('gulp');
// if (gulp.series === undefined) {
//   console.error('\nYou are using an outdated version of gulp.');
//   console.error('Please update by running:');
//   console.error(' >> npm install gulp@4.0.0 --save-dev');
//   process.exit(1);
// }


// const { src, dest, series } = require('gulp');
// const fs = require('fs');
// const install = require('gulp-install');
// const run = require('gulp-run-command').default;
// const zip = require('gulp-zip');
// const path = require('path');

// const config = {
//   projectFolder: './src',
//   projectFolderTypeScript: './dist',
//   destinationFolder: './bundle'
// };



// // ------------------------------------------------------
// // -                      Generic                       -
// // ------------------------------------------------------

// // ------------------------------------------------------
// // -                  Regular Project                   -
// // ------------------------------------------------------


// function prepareProject() {
//   return src([
//     config.projectFolder + '/**/*',
//     'package.json',
//   ])
//     .pipe(dest(config.destinationFolder))
//     .pipe(install({
//       npm: '--production',
//     }));
// }


// function build() {
//   return src(config.destinationFolder + '/**/*', { nodir: true })
//     .pipe(zip('bundle.zip'))
//     .pipe(dest('.'));
// }


// exports.default = series(
//   prepareProject,
//   changePackageFile,
//   build,
// );
// exports.build = exports.default;



// // ------------------------------------------------------
// // -                 TypeScript Project                 -
// // ------------------------------------------------------



// exports['build-ts'] = series(
//   createTempTsConfig,
//   compileTs,
//   prepareProjectTs,
//   changePackageFile,
//   createTsBundle,
//   cleanupTempTsConfig,
// );

