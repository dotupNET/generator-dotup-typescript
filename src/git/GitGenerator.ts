
import chalk from 'chalk';
import { Nested, TypeSaveProperty } from 'dotup-ts-types';
import { BaseGenerator, InquirerQuestionType } from '../BaseGenerator';
import { GithubGenerator, GithubQuestions } from '../github/GithubGenerator';
import { GitConfig } from './gitconfig';

export enum GitQuestions {
  directoryIsGitRepository = 'directoryIsGitRepository',
  repositoryName = 'repositoryName',
  rootPath = 'rootPath',
  useGithub = 'useGithub',
  // userName = 'userName',
  // userEmail = 'userEmail'
}

// Or export default!!
export class GitGenerator extends BaseGenerator<GitQuestions> {

  constructor(args: string | string[], options: Partial<TypeSaveProperty<Nested<GitQuestions, string>>>) {
    super(args, options);
    super.registerMethod(this);
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

    } else {

      this.addStepQuestion(GitQuestions.repositoryName, {
        type: InquirerQuestionType.input,
        message: 'Enter repository name',
        default: this.options.repositoryName,
        when: () => this.questions.repositoryName === undefined
      });

      // this.questions[GitQuestions.repositoryName] = {

      //   type: InquirerQuestionType.input,
      //   message: 'Enter repository name',
      //   default: this.options.repositoryName,
      //   nextQuestion: GitQuestions.rootPath,
      //   when: () => this.questions.rootPath === undefined
      // };

      this.addStepQuestion(GitQuestions.rootPath, {

        type: InquirerQuestionType.input,
        message: 'Project root path',
        default: this.options.rootPath,
        nextQuestion: GitQuestions.useGithub,
        when: () => this.questions.rootPath === undefined
      });

      this.addStepQuestion(GitQuestions.useGithub, {

        type: InquirerQuestionType.confirm,
        message: 'Configure github?',
        // default: 'Y',
        store: true

      });

      // Set start step
      // this.currentStep = GitQuestions.repositoryName;
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
    // init only when no repo exists
    const gitconfig = GitConfig.getConfig(this.answers.rootPath);

    if (gitconfig === undefined) {
      const result = this.spawnCommandSync('git', ['init']);
    }
  }

  // tslint:disable-next-line: no-reserved-keywords
  // async default(): Promise<void> { }

  async writing(): Promise<void> {
    const c = ';';

    return super.writing();
  }

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
