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
  sourcemaps = require('gulp-sourcemaps'),
  del = require('del'),
  Config = require('./gulpfile.config'),
  tsProject = tsc.createProject('tsconfig.json')
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
  var sourceTsFiles = [
    config.tsSourceFiles
  ];

  var tsResult = gulp
    .src(sourceTsFiles)
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
    .src(`${config.sourcePath}/assets/**`)
    .pipe(gulp.dest(`${config.targetPath}/assets/`))
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

gulp.task('build', gulp.series('clean-target', 'copy-assets', 'compile-ts'));
// gulp.task('build', function () {
//   return gulp.series(
//     gulp.task('clean-target')
//     // gulp.task('compile-ts'), 
//     // gulp.task('copy-assets'),
//     // function (done) {
//     //   // do more stuff
//     //   done();
//     // }
//   );
// });

gulp.task('watch-src', function () {
  gulp.watch([config.tsSourceFiles], ['compile-ts']);
});

gulp.task('watch-assets', function () {
  gulp.watch([`${config.sourcePath}/assets`],
    gulp.series('clean-assets', 'copy-assets')
  );
});

// gulp.task('default', ['ts-lint', 'compile-ts']);
// 'use strict';

// var gulp = require('gulp');
// var fs = require('fs');

// function compileTs() {
//   return run('npm run tsc -- --p .tsconfig-build.json')();
// };

// /**
//  * This will load all js files in the gulp directory in order to load all gulp tasks.
//  */
// fs.readdirSync('./tools/gulp').filter(function(file) {
//   return (/\.(js)$/i).test(file);
// }).map(function(file) {
//   require('./tools/gulp/' + file);
// });

// /**
//  * Default task clean temporaries directories and launch the main optimization build task.
//  */
// gulp.task('default', ['clean'], function () {
//   gulp.start('build');
// });

// gulp.task('tslint', function () {
//   return gulp.src(['lib/**/*.ts', 'spec/**/*.ts']).pipe(tslint()).pipe(tslint.report());
// });

// gulp.task('tsc', function (done) {
//   runSpawn(done, 'node', ['node_modules/typescript/bin/tsc']);
// });

// gulp.task('build:package', () => {
//   const editor = require('gulp-json-editor');
//   return gulp.src('./package.json')
//     .pipe(editor((json) => {
//       delete json.babel;
//       delete json.scripts;
//       delete json.jest;
//       delete json.eslintConfig;
//       delete json['size-limit'];
//       delete json['pre-commit'];
//       delete json['lint-staged'];
//       delete json.devDependencies;
//       return json;
//     }))
//     .pipe(gulp.dest('build'));
// });

// gulp.task('build:docs', () => {
//   let ignore = require('fs').readFileSync('.npmignore').toString()
//     .trim().split(/\n+/)
//     .concat([
//       'package.json', '.npmignore', 'lib/*', 'test/*',
//       'node_modules/**/*', 'docs/api.md', 'docs/plugins.md',
//       'docs/writing-a-plugin.md'
//     ]).map(i => '!' + i);
//   return gulp.src(['**/*'].concat(ignore))
//     .pipe(gulp.dest('build'));
// });

// gulp.task('clean', () => {
//   let del = require('del');
//   return del(['lib/*.js', 'postcss.js', 'build/', 'api/']);
// });

// gulp.task('test', ['pre-test'], function (cb) {
//   var mochaErr;

//   gulp.src('test/**/*.js')
//     .pipe(plumber())
//     .pipe(mocha({ reporter: 'spec' }))
//     .on('error', function (err) {
//       mochaErr = err;
//     })
//     // .pipe(istanbul.writeReports())
//     .on('end', function () {
//       cb(mochaErr);
//     });
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


// function changePackageFile(cb) {
//   const packageFilePath = path.join(process.cwd(), config.destinationFolder, 'package.json');
//   const tsConfig = require(packageFilePath);
//   tsConfig.main = './index.js';

//   fs.writeFileSync(packageFilePath, JSON.stringify(tsConfig, null, 2));
//   cb()
// }



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


// function createTempTsConfig(cb) {
//   const tsConfig = require(path.join(process.cwd(), 'tsconfig.json'));
//   tsConfig.exclude.push('test/**/*')
//   fs.writeFileSync('./.tsconfig-build.json', JSON.stringify(tsConfig, null, 2));
//   cb()
// }


// function prepareProjectTs() {
//   return src([
//     config.projectFolderTypeScript + '/**/*',
//     'package.json',
//   ])
//     .pipe(dest(config.destinationFolder))
//     .pipe(install({
//       npm: '--production',
//     }));
// }


// function createTsBundle() {
//   return src(config.destinationFolder + '/**/*', { nodir: true })
//     .pipe(zip('bundle.zip'))
//     .pipe(dest('.'));
// }


// function compileTs() {
//   return run('npm run tsc -- --p .tsconfig-build.json')();
// };


// function cleanupTempTsConfig(cb) {
//   fs.unlinkSync('./.tsconfig-build.json');
//   cb()
// }


// exports['build-ts'] = series(
//   createTempTsConfig,
//   compileTs,
//   prepareProjectTs,
//   changePackageFile,
//   createTsBundle,
//   cleanupTempTsConfig,
// );

