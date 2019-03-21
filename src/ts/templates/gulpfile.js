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
gulp.task('project-publish', gulp.series(...gulpLoader.getProcess(gulpLoader.processNames.publish)));
// gulp.task('project-watch', gulp.parallel(gulpLoader.getProcess(gulpLoader.processNames.watch)));
