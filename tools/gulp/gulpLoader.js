'use strict';
const
  fs = require('fs'),
  path = require('path'),
  taskEnabled = require('./gulp.json')
  ;

const processNames = {
  clean: 'clean',
  preBuild: 'preBuild',
  build: 'build',
  postBuild: 'postBuild',
  publish: 'publish',
  watch: 'watch'
};

class GulpLoader {

  constructor() {
    this.processNames = processNames;
    // Gulp files
    this.gulps = [];
  }

  getProcess(processName) {
    const result = [];
    const activeGulps = this.gulps; // .filter(g => config[path.basename(g, '.js')] === true);

    switch (processName) {
      case processNames.watch:

        let watches = activeGulps.filter(file => file[this.processNames.watch] !== undefined).map(file => file[this.processNames.watch]);
        result.push(watches);

        break;

      case processNames.build:
      case processNames.publish:

        let process = this.processNames.clean;
        let foos = activeGulps.filter(file => file[process] !== undefined).map(file => file[process]);
        result.push(foos);

        process = this.processNames.preBuild;
        foos = activeGulps.filter(file => file[process] !== undefined).map(file => file[process]);
        result.push(foos);

        process = this.processNames.build;
        foos = activeGulps.filter(file => file[process] !== undefined).map(file => file[process]);
        result.push(foos);

        process = this.processNames.postBuild;
        foos = activeGulps.filter(file => file[process] !== undefined).map(file => file[process]);
        result.push(foos);

        break;

    }

    // Add publish functions..
    if (processName === processNames.publish) {
      process = this.processNames.publish;
      result.push(
        activeGulps.filter(file => file[process] !== undefined).map(file => file[process])
      );
    }

    return result;
  }

  loadAllFiles() {
    const gulpFiles = fs.readdirSync('./tools/gulp').filter(file => path.extname(file) === '.js');
    gulpFiles.forEach(file => {
      if (taskEnabled[path.basename(file, '.js')] === true) {
        this.gulps.push(require('./' + file));
      }
    });
  }

}
module.exports = GulpLoader;
