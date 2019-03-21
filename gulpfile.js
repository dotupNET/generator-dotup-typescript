/**
 * Welcome to your gulpfile!
 * The gulp tasks are split in several files in the tools/gulp directory for better modularity.
 */
const gulp = require('gulp');
const GulpLoader = require('./tools/gulp/gulpLoader');

// Load all gulp files.
const gulpLoader = new GulpLoader();
gulpLoader.loadAllFiles();

gulp.task('project-build', gulp.series(...gulpLoader.getProcess(gulpLoader.processNames.build)));
gulp.task('project-publish', function () {
  const procs = gulpLoader.getProcess(gulpLoader.processNames.publish);
  if (procs.length > 0) {
    return gulp.series(...procs);
  } else {
    return undefined;
  }
});
// gulp.task('project-watch', gulp.parallel(gulpLoader.getProcess(gulpLoader.processNames.watch)));
