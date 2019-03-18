
import * as path from 'path';
// tslint:disable-next-line: match-default-export-name
import validatePackageName from 'validate-npm-package-name-typed';
import { BaseGenerator, GeneratorOptions, InquirerQuestionType } from '../BaseGenerator';
import { ProjectFiles } from '../tools/project/ProjectFiles';
import { ProjectInfo } from '../tools/project/ProjectInfo';
import { ProjectPathAnalyser } from '../tools/project/ProjectPathAnalyser';

export enum TsAppQuestions {
  projectName = 'projectName',
  invalidProjectName = 'invalidProjectName'
}

// export default!!
// tslint:disable-next-line: no-default-export
export class TypescriptAppGenerator extends BaseGenerator<TsAppQuestions> {

  constructor(args: string | string[], options: GeneratorOptions<TsAppQuestions>) {
    super(args, options);
    this.registerMethod(this);
    this.writeOptionsToAnswers(TsAppQuestions);
  }

  async initializing(): Promise<void> {

    this.logYellow(`Project path: '${this.destinationPath()}'`);

    this.questions[TsAppQuestions.projectName] = {
      type: InquirerQuestionType.input,
      message: 'Project Name',
      // tslint:disable-next-line: no-unsafe-any
      default: this.getDefaultProjectName(),
      validate: (v: string) => this.validateString(v),
      acceptAnswer: v => {
        const accept = validatePackageName(v.toString()).validForNewPackages;
        if (!accept) {
          this.logRed(`${v} is not a valid package name.`);
        }

        return true;
      },
      when: () => this.answers.projectName === undefined,
      nextQuestion: TsAppQuestions.invalidProjectName
    };

    this.questions[TsAppQuestions.invalidProjectName] = {
      type: InquirerQuestionType.confirm,
      message: 'Continue anyway?',
      default: 'N',
      acceptAnswer: accepted => {

        if (!accepted) {
          // Ask again for the project name
          this.currentStep = TsAppQuestions.projectName;
        }

        return accepted;
      },
      when: () => !validatePackageName(this.answers.projectName).validForNewPackages
    };

    this.currentStep = TsAppQuestions.projectName;

    // files
    const getPath = (...args: string[]): string => {
      return this.templatePath(...args);
    };

  }

  // async prompting(): Promise<void> { }

  async configuring(): Promise<void> {
    // this.git = new GitTools(this.answers.username, this.answers.repositoryName);

    this.log('Method configuring.');
  }

  // tslint:disable-next-line: no-reserved-keywords
  // async default(): Promise<void> { }

  // async writing(): Promise<void> { }

  async conflicts(): Promise<void> {
    this.log('Method conflicts.');
  }
  async install(): Promise<void> {
    this.log('Method isntall.');
  }
  async end(): Promise<void> {
    this.log('Method end.');
  }

}
