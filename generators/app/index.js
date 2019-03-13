'use strict';
const chalk = require('chalk');
const yosay = require('yosay');
const Helper = require('./Helper');
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

class TypescriptGenerator extends Helper {

  constructor(args, opts) {
    // Calling the super constructor is important so our generator is correctly set up
    super(args, opts);

    this.argument('projectName', { type: String, required: false });

    // Next, add your custom code
  }

  initializing() {
    this.props = {};
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

    // Initialize default values

    const x = {
      [Steps.welcome]: [
        {
          type: "input",
          name: "name",
          message: "Your project name",
          default: this.getAppName() // this.projectName // Default to current folder name
        },
        {
          type: "input",
          name: "name",
          message: "Your project name",
          default: this.getAppName() // this.projectName // Default to current folder name
        }
      ],
      [Steps.somethingElse]: [
        {
          type: "confirm",
          name: "name",
          message: "done"
        }
      ]
    };

    const prompts = [
      [
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
      [
        {
          type: 'confirm',
          name: 'done',
          message: 'Youra done',
          default: true
        }
      ]
    ];

    let currentStep = Steps.welcome;
    do {
      this.props = await this.prompt(x[currentStep]);

      switch (currentStep) {
        case Steps.welcome:
          currentStep = this.props.useGithub ? Steps.withGithub : Steps.somethingElse;
          break;

        case Steps.withGithub:
          currentStep = Steps.somethingElse;

        case Steps.somethingElse:
          currentStep = Steps.completed;

      }
    } while (currentStep !== Steps.completed);
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
    this.installDependencies();
  }
}

module.exports = TypescriptGenerator;
