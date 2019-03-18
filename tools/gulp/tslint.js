const
  gulp = require('gulp'),
  tslint = require('gulp-tslint'),
  filter = require('gulp-filter'),
  Config = require('../../gulpfile.config')
  ;

var config = new Config();


/**
 * Lint all custom TypeScript files.
 */
gulp.task('ts-lint', function () {
  // var f = filter(['**/*.ts', '!**/template']);
  var f = filter('**/*.ts');
  return gulp
    .src(config.tsSourceFiles)
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
