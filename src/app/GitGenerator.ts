
import { TypeSaveProperty, PropertyNamesOnly, Nested, KeyValuePair } from 'dotup-ts-types';
import { BaseGenerator } from '../BaseGenerator';
import { GitQuestions } from '../git/GitQuestions';

export class GitGenerator extends BaseGenerator<GitQuestions> {

  // git: GitTools;

  // answers: TypeSaveProperty<Nested<GitQuestions, string>>;
  // validate(input: any, answers?: Answers): string | boolean | Promise<string | boolean> {
  //   return true;
  // }
  // props: KeyValuePair<GitQuestions, string>[];

  constructor(args: string | string[], options: Partial<TypeSaveProperty<Nested<GitQuestions, string>>>) {
    super(args, options);
  }

  async initializing(): Promise<void> {

    // this.questions['username'] = {
    //   // name: GitQuestions.username,
    //   type: 'input',
    //   message: 'Enter your github user name',
    //   default: this.options.username,
    //   store: true,
    //   validate: this.validate
    //   // when: (answer: Answers) => { return true; }

    // };

    // this.currentStep = GitQuestions.username;

  }

  async prompting(): Promise<void> {
    let done = false;

    // do {
    //   this.questions[this.currentStep].name = this.currentStep;
    //   const anser = await this.prompt(this.questions[this.currentStep]);

    //   switch (this.currentStep) {

    //     case GitQuestions.username:
    //       this.answers[this.currentStep] = anser['value'];
    //       this.currentStep = GitQuestions.repositoryName;
    //       break;

    //     case GitQuestions.repositoryName:
    //       this.answers[this.currentStep] = anser['value'];

    //       break;

    //   }

    //   done = this.currentStep === GitQuestions.repositoryName;

    // } while (!done);
  }

  async configuring(): Promise<void> {
    // this.git = new GitTools(this.answers.username, this.answers.repositoryName);

    this.log('Method not implemented.');
  }
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
