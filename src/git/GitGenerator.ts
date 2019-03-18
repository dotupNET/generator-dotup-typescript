
import chalk from 'chalk';
import { Nested, TypeSaveProperty } from 'dotup-ts-types';
import { ConfirmQuestion, Question, StoreQuestion } from '../app/Question';
import { BaseGenerator, InquirerQuestionType } from '../BaseGenerator';
import { GithubGenerator, GithubQuestions } from '../github/GithubGenerator';
import { GitConfig } from './gitconfig';

export enum GitQuestions {
  directoryIsGitRepository = 'directoryIsGitRepository',
  repositoryName = 'repositoryName',
  rootPath = 'rootPath',
  useGithub = 'useGithub'
  // userName = 'userName',
  // userEmail = 'userEmail'
}

// Or export default!!
export class GitGenerator extends BaseGenerator<GitQuestions> {

  constructor(args: string | string[], options: Partial<TypeSaveProperty<Nested<GitQuestions, string>>>) {
    super(args, options);
    super.registerMethod(this);

    this.writeOptionsToAnswers(GitQuestions);
  }

  async initializing(): Promise<void> {

    const gitconfig = GitConfig.getConfig(this.answers.rootPath);

    if (gitconfig !== undefined) {

      // Existing git config
      this.questions[GitQuestions.directoryIsGitRepository] = {

        type: InquirerQuestionType.list,
        message: chalk.red(`Git already configured for current folder!`),
        choices: [
          {
            name: 'Cancel',
            value: 'cancel'
          }
        ]

      };

      this.logRed('Git already configured for current folder!');
      throw new Error('Git already configured for current folder!');
      this.currentStep = GitQuestions.directoryIsGitRepository;

    }

    // Repo name
    // if (this.options.repositoryName === undefined) {
    this.addQuestion(
      new Question(GitQuestions.repositoryName, {
        type: InquirerQuestionType.input,
        default: this.options.repositoryName,
        message: 'Enter repository name',
        description: 'Name of the repository'
      })
    );
    // }

    // Root path
    this.addQuestion(
      new Question(GitQuestions.rootPath, {
        type: InquirerQuestionType.input,
        message: 'Project root path',
        when: () => this.options.rootPath === undefined
      })
    );

    // Use github generator?
    this.addQuestion(
      new ConfirmQuestion(GitQuestions.useGithub, 'Configure github?')
    );

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
    // init only when no repo exists
    const gitconfig = GitConfig.getConfig(this.answers.rootPath);

    if (gitconfig === undefined) {
      const result = this.spawnCommandSync('git', ['init']);
    }
  }

  // tslint:disable-next-line: no-reserved-keywords
  // async default(): Promise<void> { }

  async install(): Promise<void> {
    this.log('Method not implemented.');
  }

  async end(): Promise<void> {

    let result = this.spawnCommandSync('git', ['add', '.']);
    result = this.spawnCommandSync('git',
      // tslint:disable-next-line: align
      [
        'commit',
        '-a',
        '-m INITIAL COMMIT by dotup-typescript yeoman generator'
      ]
    );

    // const repo = await Repository.open(this.destinationPath());
    // const index = await repo.refreshIndex();

    // // Add files
    // await index.addByPath('.gitignore');

    // // Write files
    // index.write();
    // const oid = await index.writeTree();
    // const head = await Reference.nameToId(repo, 'HEAD');
    // const parent = await repo.getCommit(head);

    // // Commit
    // const author = Signature.now('Peter Ullrich', 'peda76@gmail.com');

    // const commitOid = repo.createCommit('HEAD', author, author, 'message', oid, [parent]);

  }

}
