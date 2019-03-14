
import chalk from 'chalk';
import { Nested, TypeSaveProperty } from 'dotup-ts-types';
import { BaseGenerator, InquirerQuestionType } from '../BaseGenerator';
import { GitConfig } from './gitconfig';

export enum GitQuestions {
  directoryIsGitRepository = 'directoryIsGitRepository',
  username = 'username',
  repositoryName = 'repositoryName',
  rootPath = 'rootPath'
}

// Or export default!!
export class GitGenerator extends BaseGenerator<GitQuestions> {

  constructor(args: string | string[], options: Partial<TypeSaveProperty<Nested<GitQuestions, string>>>) {
    super(args, options);
    this.registerMethod(this, 'prompting');

    this.option(GitQuestions.username, {
      type: String,
      description: 'GitHub username'
    });

    this.option(GitQuestions.repositoryName, {
      type: String,
      description: 'Name of the repository'
    });

    this.option(GitQuestions.rootPath, {
      type: String,
      description: 'Project root path'
    });

    this.writeOptionsToAnswers(GitQuestions);
  }

  async initializing(): Promise<void> {

    const gitconfig = GitConfig.getConfig(this.answers.rootPath);

    if (gitconfig !== undefined) {

      // Existing git config
      this.questions[GitQuestions.directoryIsGitRepository] = {

        type: InquirerQuestionType.list,
        message: chalk.red(`Git allready configured for current folder!`),
        choices: [
          {
            name: 'Cancel',
            value: 'cancel'
          }
        ],
        nextQuestion: GitQuestions.repositoryName

      };

      this.currentStep = GitQuestions.directoryIsGitRepository;

    } else {

      // With github
      this.questions[GitQuestions.username] = {

        type: 'input',
        message: 'Enter your github user name',
        store: true,
        nextQuestion: GitQuestions.repositoryName

      };

      this.questions[GitQuestions.repositoryName] = {

        type: 'input',
        message: 'Enter repository name',
        default: this.options.repositoryName,
        store: true,
        nextQuestion: GitQuestions.rootPath

      };

      this.questions[GitQuestions.rootPath] = {

        type: 'input',
        message: 'Project root path',
        default: this.options.rootPath,
        store: true

      };

      // Set start step
      this.currentStep = GitQuestions.username;
    }

  }

  async prompting(): Promise<void> {
    await super.prompting();
  }

  async configuring(): Promise<void> {
    // this.git = new GitTools(this.answers.username, this.answers.repositoryName);

    this.log('Method not implemented.');
  }
  // tslint:disable-next-line: no-reserved-keywords
  async default(): Promise<void> {
    this.log('Method not implemented.');
  }
  async writing(): Promise<void> {
    this.log('Method not implemented.');
  }
  async conflicts(): Promise<void> {
    this.log('Method not implemented.');
  }
  async install(): Promise<void> {
    this.log('Method not implemented.');
  }
  async end(): Promise<void> {
    this.log('Method not implemented.');
  }

}
