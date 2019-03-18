import * as path from 'path';
// tslint:disable-next-line: match-default-export-name
import validatePackageName from 'validate-npm-package-name-typed';
import { BaseGenerator, GeneratorOptions, InquirerQuestionType } from '../BaseGenerator';
import { GitGenerator, GitQuestions } from '../git/GitGenerator';
import { TypescriptAppGenerator } from '../ts-app/TypescriptAppGenerator';
import { TsLibQuestions, TypescriptLibGenerator } from '../ts-lib/TypescriptLibGenerator';
import { InputQuestion, Question, StoreQuestion } from './Question';

export enum ProjectQuestions {
  projectType = 'projectType',
  projectName = 'projectName',
  userName = 'userName',
  userEmail = 'userEmail',
  invalidProjectName = 'invalidProjectName',
  useGit = 'useGit',
  createFolder = 'createFolder'
}

export enum ProjectType {
  ts_app_node = 'ts_app_node',
  ts_lib_node = 'ts_lib_node',
  js_app_node = 'js_app_node',
  js_lib_node = 'js_lib_node'
}

// export default!!
// tslint:disable-next-line: no-default-export
export class ProjectGenerator extends BaseGenerator<ProjectQuestions> {

  constructor(args: string | string[], options: GeneratorOptions<ProjectQuestions>) {
    super(args, options);
    super.registerMethod(this);

    this.writeOptionsToAnswers(ProjectQuestions);
  }

  async initializing(): Promise<void> {

    // Project name
    this.addQuestion(
      new Question(ProjectQuestions.projectName, {
        message: 'Project Name',
        type: InquirerQuestionType.input,
        default: this.getDefaultProjectName(),
        validate: (v: string) => this.validateString(v),
        acceptAnswer: v => {
          const accept = validatePackageName(v.toString()).validForNewPackages;
          if (!accept) {
            this.logRed(`${v} is not a valid package name.`);
          }

          return true;
        }
      })
    );

    // Invalid project name
    this.addQuestion(
      new Question(ProjectQuestions.invalidProjectName, {
        message: 'Continue anyway?',
        type: InquirerQuestionType.confirm,
        default: 'N',
        acceptAnswer: accepted => {

          if (!accepted) {
            // Ask again for the project name
            this.currentStep = ProjectQuestions.projectName;
          }

          return accepted;
        },
        when: () => !validatePackageName(this.answers.projectName).validForNewPackages
      })
    );

    // Create folder?
    this.addQuestion(
      new Question(ProjectQuestions.createFolder, {
        type: InquirerQuestionType.confirm,
        message: () => `Create folder '${this.answers.projectName}' ?`,
        default: 'Y',
        when: () => !this.destinationIsProjectFolder(this.answers.projectName),
        acceptAnswer: accepted => {
          if (accepted) {
            // Create new root
            this.destinationRoot(this.destinationPath(this.answers.projectName));
            this.logGreen(`Destination path changed to ${this.destinationPath()}`);
          }

          return accepted;
        }
      })
    );

    // Project type
    this.addQuestion(
      new StoreQuestion(ProjectQuestions.projectType, {
        message: 'Project Type',
        type: InquirerQuestionType.list,
        choices: [
          {
            name: 'Node application (Typescript)',
            value: ProjectType.ts_app_node
          },
          {
            name: 'Node library (Typescript)',
            value: ProjectType.ts_lib_node
          }
        ]
      })
    );

    // User name
    this.addQuestion(
      new InputQuestion(ProjectQuestions.userName, 'Enter your name (package.json)')
    );

    // User email
    this.addQuestion(
      new InputQuestion(ProjectQuestions.userEmail, 'Enter your email (package.json)')
    );

    this.addQuestion(
      new Question(ProjectQuestions.useGit, {
        type: InquirerQuestionType.confirm,
        message: 'Configure git?',
        default: this.options.useGit
      })
    );
  }

  async prompting(): Promise<void> {
    await super.prompting();

    this.projectInfo.language = 'ts';
    this.projectInfo.runtime = 'node';
    this.projectInfo.typ = 'app';

    if (this.answers.useGit) {

      // Load git generator
      this.composeWith(
        {
          Generator: GitGenerator,
          path: require.resolve('../git/index')
        },
        {
          [GitQuestions.rootPath]: this.destinationPath(),
          [GitQuestions.repositoryName]: this.answers.projectName
        }
      );

    }

    // Application type generator
    switch (this.answers.projectType) {

      case ProjectType.ts_app_node:

        this.composeWith(
          {
            Generator: TypescriptAppGenerator,
            path: require.resolve('../ts-app/index')
          },
          {
            [TsLibQuestions.projectName]: this.answers.projectName
          }
        );

        break;

      case ProjectType.ts_lib_node:

        this.composeWith(
          {
            Generator: TypescriptLibGenerator,
            path: require.resolve('../ts-lib/index')
          },
          {
            [TsLibQuestions.projectName]: this.answers.projectName
          }
        );

        break;

      default:
        throw new Error('Project type not implemented');
    }

  }

  async configuring(): Promise<void> {
    // this.git = new GitTools(this.answers.username, this.answers.repositoryName);

    this.log('Method configuring.');
  }

  async install(): Promise<void> {
    this.log('Method isntall.');
  }

  async end(): Promise<void> {
    this.log('Method end.');
  }

}
