
import { TypeSaveProperty, PropertyNamesOnly, Nested, KeyValuePair } from 'dotup-ts-types';
import { BaseGenerator } from '../BaseGenerator';
import { GitQuestions } from '../git/GitQuestions';
import { Question } from 'yeoman-generator';
import { IStepQuestion } from '../QuestionWithAnswer';


// export default!!
export default class GitGenerator extends BaseGenerator<GitQuestions> {

  // git: GitTools;

  // answers: TypeSaveProperty<Nested<GitQuestions, string>>;
  // validate(input: any, answers?: Answers): string | boolean | Promise<string | boolean> {
  //   return true;
  // }
  // props: KeyValuePair<GitQuestions, string>[];
  answers: TypeSaveProperty<Nested<GitQuestions, string>>;

  constructor(args: string | string[], options: Partial<TypeSaveProperty<Nested<GitQuestions, string>>>) {
    super(args, options);
  }

  async initializing(): Promise<void> {

    this.questions = <Nested<GitQuestions, IStepQuestion<GitQuestions>>>{};
    this.answers = <TypeSaveProperty<Nested<GitQuestions, string>>>{};

    this.questions[GitQuestions.username] = {
      // name: GitQuestions.username,
      type: 'input',
      message: 'Enter your github user name',
      default: this.options.username,
      store: true,
      nextQuestion: GitQuestions.repositoryName //,
      // validate: this.validate
      // when: (answer: Answers) => { return true; }

    };
    this.questions[GitQuestions.repositoryName] = {
      // name: GitQuestions.username,
      type: 'input',
      message: 'Enter repository name',
      default: this.options.repositoryName,
      store: true//,
      // validate: this.validate
      // when: (answer: Answers) => { return true; }

    };

    this.currentStep = GitQuestions.username;

  }

  async prompting(): Promise<void> {
    let done = false;

    do {
      this.questions[this.currentStep].name = this.currentStep;
      const answer = await this.prompt(this.questions[this.currentStep]);
      this.answers[this.currentStep] = answer[this.currentStep];
      this.currentStep = this.questions[this.currentStep].nextQuestion;

      // switch (this.currentStep) {

      //   case GitQuestions.username:
      //     this.currentStep = GitQuestions.repositoryName;
      //     break;

      //   case GitQuestions.repositoryName:
      //     this.answers[this.currentStep] = answer['value'];

      //     break;

      // }

    } while (this.currentStep !== undefined);
    console.log(this.answers);
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
