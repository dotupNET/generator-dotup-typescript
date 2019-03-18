/**
 * Welcome to your gulpfile!
 * The gulp tasks are split in several files in the gulp directory for better modularity.
 */
const
  gulp = require('gulp'),
  del = require('del'),
  build = require('./tools/gulp/build'),
  Config = require('./gulpfile.config')
  ;

// Load config and all gulp files.
var config = new Config();
config.loadAllFiles();

gulp.task('project-build',
  gulp.series(
    build.clean,
    build.compile,
    assetsCopy,
    templatesCopy
  )
);

gulp.task('gulp-copy', function () {
  return gulp
    .src(`tools/gulp/**`, { dot: true })
    .pipe(gulp.dest(`${config.targetPath}/tools/gulp`))
    ;
});

function assetsClean() {
  return del([`${config.targetPath}/assets`]);
}
gulp.task('assets-clean', assetsClean);

function assetsCopy() {
  return gulp
    .src(`${config.sourcePath}/assets/**`, { dot: true })
    .pipe(gulp.dest(`${config.targetPath}/assets/`))
    ;
}
gulp.task('assets-copy', assetsCopy);

gulp.task('assets-watch', function () {
  return gulp.watch([`${config.sourcePath}/assets`],
    gulp.series('assets-clean', 'assets-copy')
  );
});

function templatesCopy() {
  return gulp
    .src(`${config.sourcePath}/**/templates/**`, { dot: true })
    .pipe(gulp.dest(`${config.targetPath}/`))
    ;
}
gulp.task('templates-copy', templatesCopy);

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

