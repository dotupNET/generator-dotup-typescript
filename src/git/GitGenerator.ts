
import chalk from 'chalk';
import { Nested, TypeSaveProperty } from 'dotup-ts-types';
import { Reference, Repository, Signature } from 'nodegit';
import { BaseGenerator, InquirerQuestionType } from '../BaseGenerator';
import { GithubGenerator, GithubQuestions } from '../github/GithubGenerator';
import { GitConfig } from './gitconfig';

export enum GitQuestions {
  directoryIsGitRepository = 'directoryIsGitRepository',
  // username = 'username',
  repositoryName = 'repositoryName',
  rootPath = 'rootPath',
  useGithub = 'useGithub'
}

// Or export default!!
export class GitGenerator extends BaseGenerator<GitQuestions> {

  constructor(args: string | string[], options: Partial<TypeSaveProperty<Nested<GitQuestions, string>>>) {
    super(args, options);
    this.registerMethod(this, 'prompting');

    // this.option(GitQuestions.username, {
    //   type: String,
    //   description: 'GitHub username'
    // });

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
        ]

      };

      this.currentStep = GitQuestions.directoryIsGitRepository;

    } else {

      // With github
      // this.questions[GitQuestions.username] = {

      //   type: 'input',
      //   message: 'Enter your github user name',
      //   store: true,
      //   nextQuestion: GitQuestions.repositoryName

      // };

      this.questions[GitQuestions.repositoryName] = {

        type: InquirerQuestionType.input,
        message: 'Enter repository name',
        default: this.options.repositoryName,
        nextQuestion: GitQuestions.rootPath

      };

      this.questions[GitQuestions.rootPath] = {

        type: InquirerQuestionType.input,
        message: 'Project root path',
        default: this.options.rootPath,
        nextQuestion: GitQuestions.useGithub,
        when: () => this.options.rootPath === undefined
      };

      this.questions[GitQuestions.useGithub] = {

        type: InquirerQuestionType.confirm,
        message: 'Configure github?',
        default: 'Y',
        store: true

      };

      // Set start step
      this.currentStep = GitQuestions.repositoryName;
    }

  }

  async prompting(): Promise<void> {
    await super.prompting();

    if (this.answers.useGithub) {
      // Load git generator
      this.composeWith(
        // Generator
        {
          Generator: GithubGenerator,
          path: require.resolve('../github/index')
        },
        // Options
        {
          [GithubQuestions.repositoryName]: this.answers.repositoryName
        }
        // Settings
      );

    }
  }

  async configuring(): Promise<void> {
    // this.git = new GitTools(this.answers.username, this.answers.repositoryName);

    const repo = await Repository.init(this.destinationPath(), 0);

  }
  // tslint:disable-next-line: no-reserved-keywords
  async default(): Promise<void> {
    this.log('Method not implemented.');
  }
  async writing(): Promise<void> {
    this.fs.copy(this.templatePath('_gitignore'), this.destinationPath('.gitignore'));
    this.log('Method not implemented.');
  }
  async conflicts(): Promise<void> {
    this.log('Method not implemented.');
  }
  async install(): Promise<void> {
    this.log('Method not implemented.');
  }

  async end(): Promise<void> {
    const repo = await Repository.open(this.destinationPath());
    const index = await repo.refreshIndex();

    // Add files
    await index.addByPath('.gitignore');

    // Write files
    index.write();
    const oid = await index.writeTree();
    const head = await Reference.nameToId(repo, 'HEAD');
    const parent = await repo.getCommit(head);

    // Commit
    const author = Signature.now('Peter Ullrich', 'peda76@gmail.com');

    const commitOid = repo.createCommit('HEAD', author, author, 'message', oid, [parent]);
  }

}
