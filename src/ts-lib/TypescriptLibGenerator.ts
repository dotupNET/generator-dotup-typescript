
import * as path from 'path';
// tslint:disable-next-line: match-default-export-name
import validatePackageName from 'validate-npm-package-name-typed';
import { BaseGenerator, GeneratorOptions, InquirerQuestionType } from '../BaseGenerator';
import { ProjectFiles } from '../tools/project/ProjectFiles';
import { ProjectInfo } from '../tools/project/ProjectInfo';
import { ProjectPathAnalyser } from '../tools/project/ProjectPathAnalyser';

export enum TsLibQuestions {
  projectName = 'projectName',
  invalidProjectName = 'invalidProjectName'
}

export class TypescriptLibGenerator extends BaseGenerator<TsLibQuestions> {

  constructor(args: string | string[], options: GeneratorOptions<TsLibQuestions>) {
    super(args, options);
    this.registerMethod(this);
    this.writeOptionsToAnswers(TsLibQuestions);
  }

  async initializing(): Promise<void> {

    this.questions[TsLibQuestions.projectName] = {
      type: InquirerQuestionType.input,
      message: 'Project Name',
      default: this.getDefaultProjectName(),
      validate: (v: string) => this.validateString(v),
      acceptAnswer: v => {
        const accept = validatePackageName(v.toString()).validForNewPackages;
        if (!accept) {
          this.logRed(`${v} is not a valid package name.`);
        }

        return true;
      },
      when: () => this.options.projectName === undefined,
      nextQuestion: TsLibQuestions.invalidProjectName
    };

    this.questions[TsLibQuestions.invalidProjectName] = {
      type: InquirerQuestionType.confirm,
      message: 'Continue anyway?',
      default: 'N',
      acceptAnswer: accepted => {

        if (!accepted) {
          // Ask again for the project name
          this.currentStep = TsLibQuestions.projectName;
        }

        return accepted;
      },
      when: () => !validatePackageName(this.answers.projectName).validForNewPackages
    };

    this.currentStep = TsLibQuestions.projectName;

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
