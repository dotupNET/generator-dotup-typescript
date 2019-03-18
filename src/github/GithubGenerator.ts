// tslint:disable: no-backbone-get-set-outside-model

import { Nested, TypeSaveProperty } from 'dotup-ts-types';
// tslint:disable-next-line: no-submodule-imports
// import { HttpClient } from 'typed-rest-client/HttpClient';
import { BaseGenerator, InquirerQuestionType } from '../BaseGenerator';
import { GithubApiClient } from './githubapi/GithubApiClient';

export enum GithubQuestions {
  username = 'username',
  password = 'password',
  repositoryName = 'repositoryName'
}

// Or export default!!
export class GithubGenerator extends BaseGenerator<GithubQuestions> {

  private repositoryExists: boolean;

  constructor(args: string | string[], options: Partial<TypeSaveProperty<Nested<GithubQuestions, string>>>) {
    super(args, options);
    this.registerMethod(this);

    this.option(GithubQuestions.username, {
      type: String,
      description: 'GitHub username'
    });

    this.option(GithubQuestions.repositoryName, {
      type: String,
      description: 'Repository name'
    });

    this.option(GithubQuestions.password, {
      type: String,
      description: 'Password'
    });

    this.writeOptionsToAnswers(GithubQuestions);
  }

  async initializing(): Promise<void> {

    this.questions[GithubQuestions.username] = {

      type: InquirerQuestionType.input,
      message: 'Enter your github user name',
      default: this.answers.username,
      store: true,
      nextQuestion: GithubQuestions.password,
      when: x => this.answers.username === undefined
    };

    this.questions[GithubQuestions.password] = {
      type: InquirerQuestionType.password,
      message: 'Enter your password',
      store: false,
      nextQuestion: GithubQuestions.repositoryName
    };

    this.questions[GithubQuestions.repositoryName] = {

      type: InquirerQuestionType.input,
      message: 'Enter repository name',
      default: this.answers.repositoryName,
      store: true,
      when: x => this.answers.repositoryName === undefined

    };

    this.currentStep = GithubQuestions.username;

    // const alreadyExist = GitConfig.getConfig(this.answers.rootPath);

    // if (gitconfig !== undefined) {

    //   // Existing git config
    //   this.questions[GithubQuestions.directoryIsGitRepository] = {

    //     type: InquirerQuestionType.list,
    //     message: chalk.red(`Git already configured for current folder!`),
    //     choices: [
    //       {
    //         name: 'Cancel',
    //         value: 'cancel'
    //       }
    //     ]

    //   };

    //   this.currentStep = GithubQuestions.username;

    // } else {

    //   // With github
    //   this.questions[GithubQuestions.username] = {

    //     type: 'input',
    //     message: 'Enter your github user name',
    //     store: true,
    //     nextQuestion: GithubQuestions.username

    //   };

    //   this.questions[GithubQuestions.password] = {

    //     type: InquirerQuestionType.password,
    //     message: 'Enter your password',
    //     store: true
    //   };

    //   // Set start step
    //   this.currentStep = GithubQuestions.username;
    // }

  }

  async prompting(): Promise<void> {
    await super.prompting();
  }

  async configuring(): Promise<void> {
    // If the repository exist, we do nothing
    const git = new GithubApiClient(this.answers.username, this.answers.password);
    this.repositoryExists = await git.ownRepositoryExists(this.answers.repositoryName);

    if (this.repositoryExists) {
      // Repo already exitst
      this.logYellow(`Skipped. Repository '${this.answers.repositoryName}' already exists.`);
    } else {
      // Create the repository
      const result = await git.createRepository({
        name: this.answers.repositoryName,
        private: false
      });

      const message = `statusCode: ${result.message.statusCode} | statusMessage: ${result.message.statusMessage}`;
      if (result.message.statusCode === 201) {
        this.logGreen(message);
      } else {
        this.logRed(message);
      }
      console.log(result.message.statusCode);
    }

  }

  // tslint:disable-next-line: no-reserved-keywords
  // async default(): Promise<void> {}
  // async writing(): Promise<void> {  }

  async conflicts(): Promise<void> {
    this.log('Method not implemented.');
  }
  async install(): Promise<void> {
    this.log('Method not implemented.');
  }
  async end(): Promise<void> {
    const git = new GithubApiClient(this.answers.username, this.answers.password);
    const url = git.getRepositoryUrl(this.answers.repositoryName);

    this.spawnCommandSync('git', ['remote', 'add', 'origin', url], {
      cwd: this.destinationPath()
    });
  }

}
