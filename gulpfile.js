/**
 * Welcome to your gulpfile!
 * The gulp tasks are split in several files in the gulp directory for better modularity.
 */
const
  gulp = require('gulp'),
  del = require('del'),
  Config = require('./gulpfile.config')
  ;

var config = new Config();
// Load all gulp files.
config.loadAllFiles();

gulp.task('gulp-copy', function () {
  return gulp
    .src(`tools/gulp/**`, { dot: true })
    .pipe(gulp.dest(`${config.targetPath}/tools/gulp`))
    ;
});

gulp.task('assets-clean', function () {
  return del([`${config.targetPath}/assets`]);
});

gulp.task('assets-copy', function () {
  return gulp
    .src(`${config.sourcePath}/assets/**`, { dot: true })
    .pipe(gulp.dest(`${config.targetPath}/assets/`))
    ;
});

gulp.task('assets-watch', function () {
  return gulp.watch([`${config.sourcePath}/assets`],
    gulp.series('assets-clean', 'assets-copy')
  );
});

gulp.task('templates-copy', function () {
  return gulp
    .src(`${config.sourcePath}/**/templates/**`, { dot: true })
    .pipe(gulp.dest(`${config.targetPath}/`))
    ;
});

gulp.task('templates-watch', function () {
  return gulp.watch([`${config.sourcePath}/**/templates/**`],
    gulp.series('templates-copy')
  );
});

gulp.task('watch-static',
  gulp.parallel(
    'assets-watch',
    'templates-watch'
  ),
  function (done) {
    done();
  }
);

// gulp.task('build',
//   gulp.series(
//     'clean-target',
//     'copy-assets',
//     'compile-ts',
//     'copy-templates'
//   )
// );


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

