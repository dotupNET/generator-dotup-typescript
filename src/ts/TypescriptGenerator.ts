// tslint:disable-next-line: max-line-length
import { BaseGenerator, GeneratorOptions, InquirerQuestionType, OptionalQuestion, ProjectPathAnalyser, Question } from 'dotup-typescript-yeoman-generators';
import * as path from 'path';
import validateNpmPackageNameTyped from 'validate-npm-package-name-typed';
import { IStringProperty } from '../types';

export enum TsQuestions {
  projectName = 'projectName',
  invalidProjectName = 'invalidProjectName',
  sourcePath = 'sourcePath',
  targetPath = 'targetPath',
  testPath = 'testPath',
  docsPath = 'docsPath',
  mainFile = 'mainFile',
  typesFile = 'typesFile'
}

export class TypescriptGenerator extends BaseGenerator<TsQuestions> {

  constructor(args: string | string[], options: GeneratorOptions<TsQuestions>) {
    super(args, options);
    this.registerMethod(this);
    this.writeOptionsToAnswers(TsQuestions);
  }

  async initializing(): Promise<void> {
    const opt = <IStringProperty>this.options;

    // Project name
    this.addQuestion(
      new Question(TsQuestions.projectName, {
        type: InquirerQuestionType.input,
        message: 'Project Name',
        default: this.getDefaultProjectName(),
        validate: (v: string) => this.validateString(v),
        acceptAnswer: v => {
          const accept = validateNpmPackageNameTyped(v.toString()).validForNewPackages;
          if (!accept) {
            this.logRed(`${v} is not a valid package name.`);
          }

          return true;
        },
        When: () => opt.projectName === undefined

      })
    );

    this.addQuestion(
      new OptionalQuestion(TsQuestions.invalidProjectName, {
        type: InquirerQuestionType.confirm,
        message: 'Continue anyway?',
        default: 'N',
        acceptAnswer: accepted => {

          if (!accepted) {
            // Ask again for the project name
            this.currentStep = TsQuestions.projectName;
          }

          return accepted;
        },
        When: () => !validateNpmPackageNameTyped(opt.projectName).validForNewPackages
      })
    );

  }

  async prompting(): Promise<void> {
    const result = await super.prompting();
  }

  async configuring(): Promise<void> {
    // this.git = new GitTools(this.answers.username, this.answers.repositoryName);

    this.log('Method configuring.');
  }

  // :( Refactor !
  loadTemplateFiles(): void {
    super.loadTemplateFiles();
    const analyser = new ProjectPathAnalyser((...args) => this.templatePath(...args));
    const files = analyser.getDeepFiles(this.templatePath('..', '..', 'shared'));
    files.forEach(f => f.targetPath = this.destinationPath('tools', 'gulp', path.basename(f.targetPath)));
    this.projectFiles.templateFiles.push(...files);
  }
  // tslint:disable-next-line: no-reserved-keywords
  // async default(): Promise<void> { }

  // async writing(): Promise<void> { }

  async conflicts(): Promise<void> {
  }
  async install(): Promise<void> {
  }
  async end(): Promise<void> {
  }

}
