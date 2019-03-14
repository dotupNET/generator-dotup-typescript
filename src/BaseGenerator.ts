import * as generator from 'yeoman-generator';
import { Question } from 'yeoman-generator';
import { TypeSaveProperty, Nested } from 'dotup-ts-types';
import { IStepQuestion } from './QuestionWithAnswer';
import { FunctionNamesOnly } from 'dotup-ts-types';
import chalk, { Chalk } from 'chalk';
import * as _ from 'lodash';
import * as path from 'path';

export type MethodsToRegister<T extends string> = FunctionNamesOnly<Pick<BaseGenerator<T>,
  'initializing' | 'prompting' | 'configuring' | 'default' | 'writing' |
  'conflicts' | 'install' | 'end'
>>;

export enum InquirerQuestionType {
  input = 'input',
  number = 'number',
  confirm = 'confirm',
  list = 'list',
  rawlist = 'rawlist',
  password = 'password'
}

export interface Questions {
  [key: string]: Question;
}

export type GeneratorOptions<T extends string> = Partial<TypeSaveProperty<Nested<T, string>>>;

export abstract class BaseGenerator<TStep extends string> extends generator.default {

  answers: TypeSaveProperty<Nested<TStep, string>>;

  questions: Nested<TStep, IStepQuestion<TStep>>;

  currentStep: TStep;

  constructor(args: string | string[], options: GeneratorOptions<TStep>) {
    super(args, options);
    this.questions = <Nested<TStep, IStepQuestion<TStep>>>{};
    this.answers = <TypeSaveProperty<Nested<TStep, string>>>{};
  }

  registerMethod(self: BaseGenerator<TStep>, method: MethodsToRegister<TStep>): void {
    self.constructor.prototype.prompting = this[method];
  }

  getDefaultProjectName(): string {
    if (this.options.projectName) {
      return _.kebabCase(this.options.projectName);
    } else {
      return _.kebabCase(this.appname);
    }
  }

  destinationIsProjectFolder(projectName: string): boolean {
    const root = path.basename(this.destinationPath());
    if (root.toLowerCase() === projectName.toLowerCase()) {
      return true;
    } else {
      return false;
    }
  }

  writeOptionsToAnswers(propertyDescriptor: any): any {
    const options = Object.keys(propertyDescriptor).map(x => <TStep>x);
    options.forEach(key => {
      if (this.options[key] !== undefined) {
        this.answers[key] = this.options[key];
      }
    });
  }

  validateString(value: string): boolean {
    if (value.length > 0) {
      return true;
    } else {
      this.logRed(`${this.questions[this.currentStep].message} is required.`);
      return false;
    }
  }

  logRed(message: string): void {
    this.log(chalk.red(message));
  }

  logBlue(message: string): void {
    this.log(chalk.blue(message));
  }

  logYellow(message: string): void {
    this.log(chalk.yellow(message));
  }

  /**
   * Your initialization methods(checking current project state, getting configs, etc)
   */
  abstract initializing(): Promise<void>;

  /**
   * Where you prompt users for options(where you’d call this.prompt())
   */
  async prompting(): Promise<void> {
    do {
      // Set name to avoid writing the name twice on the definition
      this.questions[this.currentStep].name = this.currentStep;
      // Prompt
      const answer = await this.prompt(this.questions[this.currentStep]);
      // Store answer
      this.answers[this.currentStep] = answer[this.currentStep];
      // Set next step
      this.currentStep = this.questions[this.currentStep].nextQuestion;

    } while (this.currentStep !== undefined);
  }

  /**
   * Saving configurations and configure the project(creating.editorconfig files and other metadata files)
   */
  abstract configuring(): Promise<void>;

  /**
   * If the method name doesn’t match a priority, it will be pushed to this group.
   */
  abstract default(): Promise<void>;

  /**
   * Where you write the generator specific files(routes, controllers, etc)
   */
  abstract writing(): Promise<void>;

  /**
   * Where conflicts are handled(used internally)
   */
  abstract conflicts(): Promise<void>;

  /**
   * Where installations are run(npm, bower)
   */
  abstract install(): Promise<void>;

  /**
   * Called last, cleanup, say good bye, etc
   */
  abstract end(): Promise<void>;

}
