const Generator = require('yeoman-generator');
const path = require('path');
const _ = require('lodash');

module.exports = class Helper extends Generator {

  getAppName() {
    if (this.options.projectName) {
      this.projectName = _.kebabCase(this.options.projectName);
    } else {
      this.projectName = _.kebabCase(this.appname);
    }
    return this.projectName;
  }

  promptCompleted() {
    // if(this.)
    return false;
  }

}
