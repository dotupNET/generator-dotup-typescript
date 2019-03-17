'use strict';

var GulpConfig = (function () {
  function gulpConfig() {
    // source
    this.sourcePath = 'src';
    this.tsSourceFiles = this.sourcePath + '/**/*.ts';
    // test
    this.testPath = 'test';
    this.testFiles = `${this.testPath}/**/*.ts`;
    // target
    this.targetPath = 'dist';
    // docs
    this.docsPath = 'docs';
    this.docsFiles = this.docsPath + '/**/*';
  }
  return gulpConfig;
})();
module.exports = GulpConfig;
