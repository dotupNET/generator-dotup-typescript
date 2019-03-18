const
  gulp = require('gulp'),
  tslint = require('gulp-tslint'),
  filter = require('gulp-filter'),
  Config = require('../../gulpfile.config'),
  tsc = require('gulp-typescript')
  ;

var config = new Config();
const tsProject = tsc.createProject('tsconfig.json');


/**
 * Lint all custom TypeScript files.
 */
gulp.task('ts-lint', function () {
  // var f = filter(['**/*.ts', '!**/template']);
  var f = filter('**/*.ts');
  return tsProject.src(config.tsSourceFiles)
    .pipe(f)
    .pipe(
      tslint({
        configuration: "tslint.json",
        formatter: "stylish"
      })
    )
    .pipe(
      tslint.report({
        emitError: false,
        allowWarnings: true
      })
    )
    ;
});
