// tslint:disable: no-backbone-get-set-outside-model

import { Nested, TypeSaveProperty } from 'dotup-ts-types';
import { Question, StoreQuestion } from '../app/Question';
// tslint:disable-next-line: no-submodule-imports
// import { HttpClient } from 'typed-rest-client/HttpClient';
import { BaseGenerator, InquirerQuestionType } from '../BaseGenerator';
import { GithubApiClient } from './githubapi/GithubApiClient';

export enum GithubQuestions {
  username = 'username',
  password = 'password',
  repositoryName = 'repositoryName',
  githubUrl = 'githubUrl'
}

// Or export default!!
export class GithubGenerator extends BaseGenerator<GithubQuestions> {

  private repositoryExists: boolean;

  constructor(args: string | string[], options: Partial<TypeSaveProperty<Nested<GithubQuestions, string>>>) {
    super(args, options);
    this.registerMethod(this);

    this.writeOptionsToAnswers(GithubQuestions);
  }

  async initializing(): Promise<void> {

    this.addQuestion(
      new StoreQuestion(GithubQuestions.username, {
        message: 'Enter your github user name',
        default: this.options.username,
        type: InquirerQuestionType.input
        // when: x => this.options.username === undefined
      })
    );

    this.addQuestion(
      new Question(GithubQuestions.password, {
        message: 'Enter your password',
        description: 'Github password',
        type: InquirerQuestionType.password
      })
    );

    this.addQuestion(
      new Question(GithubQuestions.repositoryName, {
        type: InquirerQuestionType.input,
        message: 'Enter repository name',
        description: 'Repository name',
        When: x => this.options.repositoryName === undefined
      })
    );

  }

  async configuring(): Promise<void> {
    // If the repository exist, we do nothing
    const git = new GithubApiClient(this.answers.username, this.answers.password);
    this.repositoryExists = await git.ownRepositoryExists(this.answers.repositoryName);

    // Set remote origin url
    this.answers.githubUrl = git.getRepositoryUrl(this.answers.repositoryName);

    if (this.repositoryExists) {
      // Repo already exitst
      this.logYellow(`Github repository '${this.answers.repositoryName}' already exists.`);
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
        this.logRed(`${message}. Could not create github repository.`);
      }
    }

  }

  // tslint:disable-next-line: no-reserved-keywords
  // async default(): Promise<void> {}
  // async writing(): Promise<void> {  }

  async install(): Promise<void> {
  }

  async end(): Promise<void> {
    const git = new GithubApiClient(this.answers.username, this.answers.password);
    const url = git.getRepositoryUrl(this.answers.repositoryName);

    this.spawnCommandSync('git', ['remote', 'add', 'origin', url], {
      cwd: this.destinationPath()
    });
  }

}
