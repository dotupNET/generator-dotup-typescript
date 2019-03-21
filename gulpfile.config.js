'use strict';
const
  fs = require('fs'),
  path = require('path'),
  config = require('./tools/gulp/gulp.json')
  ;

const processNames = {
  clean: 'clean',
  preBuild: 'preBuild',
  build: 'build',
  postBuild: 'postBuild',
  publish: 'publish',
  watch: 'watch'
};

// const processNames = {
//   preBuild: 'preBuild',
//   build: 'build',
//   postBuild: 'postBuild',
//   clean: 'clean',
//   watch: 'watch'
// };

class GulpConfig {

  constructor() {
    this.processNames = processNames;

    // Gulp files
    this.gulpFiles = [];

    // source
    this.sourcePath = 'src';
    this.tsSourceFiles = this.sourcePath + '/**/*.ts';

    // test
    this.testPath = 'test';
    this.testFiles = `${this.testPath}/**/*.ts`;

    // target
    this.targetPath = 'generators';

    // docs
    this.docsPath = 'docs';
    this.docsFiles = this.docsPath + '/**/*';

    // Static files
    this.statics = [
      {
        sourcePath: `${this.sourcePath}/assets/**`,
        targetPath: `${this.targetPath}/assets`
      }
      ,
      {
        sourcePath: `${this.sourcePath}/**/templates/**`,
        targetPath: `${this.targetPath}`
      }
    ];
  }

  getBuildProcess() {
    const result = [];

    // Disabled are not loaded...
    const activeGulps = this.gulpFiles; // .filter(g => config[path.basename(g, '.js')] === true);

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

    process = this.processNames.publish;
    foos = activeGulps.filter(file => file[process] !== undefined).map(file => file[process]);
    result.push(foos);

    return result;
  }

  loadAllFiles() {
    const gulps = fs.readdirSync('./tools/gulp').filter(file => path.extname(file) === '.js');
    gulps.forEach(file => {
      if (config[path.basename(file, '.js')] === true) {
        this.gulpFiles.push(require('./tools/gulp/' + file));
      }
    });
  }

}
module.exports = GulpConfig;
