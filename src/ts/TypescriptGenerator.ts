// tslint:disable-next-line: max-line-length
import { Nested, TypeSaveProperty } from 'dotup-ts-types';
import { BaseGenerator, ConfirmQuestion, GeneratorOptions, InquirerQuestionType, OptionalQuestion, ProjectPathAnalyser, Question, StoreQuestion } from 'dotup-typescript-yeoman-generators';
import * as path from 'path';
import validateNpmPackageNameTyped from 'validate-npm-package-name-typed';
import { TsQuestions } from './TsQuestions';

export type PartialTypescriptQuestions = Partial<TypeSaveProperty<Nested<TsQuestions, string>>>;

export class TypescriptGenerator extends BaseGenerator<TsQuestions> {

  constructor(args: string | string[], options: GeneratorOptions<TsQuestions>) {
    super(args, options);
    this.registerMethod(this);
    this.writeOptionsToAnswers(TsQuestions);
  }

  async initializing(): Promise<void> {

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
        When: () => {
          return this.tryGetAnswer(TsQuestions.projectName) === undefined
        }

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
        When: () => {
          const name = this.tryGetAnswer(TsQuestions.projectName);
          return !validateNpmPackageNameTyped(name).validForNewPackages;
        }
      })
    );

    this.addQuestion(
      new ConfirmQuestion(TsQuestions.useGit, 'Configure git?')
    );

    // Use github?
    this.addQuestion(
      new StoreQuestion(TsQuestions.useGithub, {
        type: InquirerQuestionType.confirm,
        message: 'Configure github?',
        When: _ => this.answers.useGit.toString() === 'true'
      })
    );

  }

  async prompting(): Promise<void> {
    const result = await super.prompting();

    if (this.answers.useGit.toString() === 'true') {
      // TODO: remove rootPath
      // (<any>this.answers).rootPath = this.destinationPath(),
      this.compose('generator-dotup-git/generators/app');
    }

    if (this.answers.useGithub.toString() === 'true') {
      // Load git generator
      this.compose('generator-dotup-github/generators/app');
    }

  }

  async configuring(): Promise<void> {
    // this.git = new GitTools(this.answers.username, this.answers.repositoryName);
  }

  // :( Refactor !
  loadTemplateFiles(): void {
    super.loadTemplateFiles();
    const analyser = new ProjectPathAnalyser((...args) => this.templatePath(...args));
    const files = analyser.getDeepFiles(this.templatePath('..', '..', 'shared'));
    files.forEach(f => f.targetPath = this.destinationPath('tools', 'gulp', path.basename(f.targetPath)));
    this.projectFiles.templateFiles.push(...files);
  }

  async conflicts(): Promise<void> {
  }
  async install(): Promise<void> {
  }
  async end(): Promise<void> {
  }

}
