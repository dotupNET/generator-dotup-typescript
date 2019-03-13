'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

class TypescriptGenerator extends Generator {

  // initializing() { }

  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(
        `Welcome to the funkadelic ${chalk.red(
          'generator-dotup-typescript'
        )} generator!`
      )
    );

    const prompts = [
      {
        type: 'confirm',
        name: 'someAnswer',
        message: 'Would you like to enable this option?',
        default: true
      }
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {
    this.fs.copy(
      this.templatePath('dummyfile.txt'),
      this.destinationPath('dummyfile.txt')
    );
  }

  install() {
    this.installDependencies();
  }
}

module.exports = TypescriptGenerator;
