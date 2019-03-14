'use strict';
const chalk = require('chalk');
const yosay = require('yosay');
const path = require('path');
const mkdirp = require('mkdirp');
const Helper = require('./Helper');
const x = require('dotup-ts-yo-generator-extensions');

// https://www.npmjs.com/package/npm-api
// https://www.npmjs.com/package/package-info

// initializing - Your initialization methods(checking current project state, getting configs, etc)
// prompting - Where you prompt users for options(where you’d call this.prompt())
// configuring - Saving configurations and configure the project(creating.editorconfig files and other metadata files)
// default - If the method name doesn’t match a priority, it will be pushed to this group.
// writing - Where you write the generator specific files(routes, controllers, etc)
// conflicts - Where conflicts are handled(used internally)
// install - Where installations are run(npm, bower)
// end - Called last, cleanup, say good bye, etc

const Steps = Object.freeze(
  {
    'welcome': 0,
    'withGithub': 1,
    'somethingElse': 2,
    'completed': 3
  });

const Components = Object.freeze(
  {
    'welcome': 0,
    'github': 1,
    'tslint': 2,
    'travis': 3
  });

class TypescriptGenerator extends x.BaseGenerator {

  constructor(args, opts) {
    // Calling the super constructor is important so our generator is correctly set up
    super(args, opts);

    this.argument('projectName', { type: String, required: false });
    const myName = this.getName();
    // Next, add your custom code
  }

  initializing() {
    this.props = {};
    if (process.env.NODE_ENV && process.env.NODE_ENV === 'debug') {
      this.appname = 'generated';
      this._destinationRoot = path.join(this.destinationPath(), 'generated');
    }
  }

  async prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(
        `Welcome to the funkadelic ${chalk.red(
          'dotup-typescript'
        )} generator!`
      )
    );

    this.log(`appname: ${this.appname}`);
    this.log(`destinationPath: ${this.destinationPath()}`);
    this.log(`path.basename(process.cwd()): ${path.basename(process.cwd())}`);
    this.log(`path.basename(process.execPath): ${path.basename(process.execPath)}`);

    // Initialize default values

    const prompts = {
      [Steps.welcome]: [
        {
          type: "input",
          name: "name",
          message: "Your project name",
          default: this.getAppName() // this.projectName // Default to current folder name
        },
        {
          type: 'confirm',
          name: 'useGithub',
          message: 'Would you like to use github?',
          default: true
        }
      ],
      [Steps.withGithub]: [
        {
          type: "input",
          name: "githubUsername",
          message: "Your github user name",
          default: this.getAppName() // this.projectName // Default to current folder name
        }
      ],
      [Steps.somethingElse]: [
        {
          type: 'confirm',
          name: 'done',
          message: 'Youra done',
          default: true
        }
      ]
    };


  }

  default() {
    this.composeWith(require.resolve('../git'), {
      githubAccount: 'dotupNET',
      destinationRoot: this.destinationRoot()
    });
  }
  // configuring - Saving configurations and configure the project(creating.editorconfig files and other metadata files)
  async configuring() {

  }

  writing() {
    this.fs.copy(
      this.templatePath('dummyfile.txt'),
      this.destinationPath('dummyfile.txt')
    );
  }

  install() {
    // this.installDependencies();
  }
}

module.exports = TypescriptGenerator;
