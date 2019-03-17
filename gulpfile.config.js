'use strict';
var GulpConfig = (function () {
  function gulpConfig() {
    this.sourcePath = './src';
    this.tsSourceFiles = this.sourcePath + '/**/*.ts';
    this.targetPath = './generators';
  }
  return gulpConfig;
})();
module.exports = GulpConfig;
