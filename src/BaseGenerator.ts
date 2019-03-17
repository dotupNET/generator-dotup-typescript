// tslint:disable: no-object-literal-type-assertion
import chalk from 'chalk';
import { FunctionNamesOnly, Nested, TypeSaveProperty } from 'dotup-ts-types';
import * as fs from 'fs';
import * as _ from 'lodash';
import * as path from 'path';
import * as generator from 'yeoman-generator';
// import { Question } from 'yeoman-generator';
import { IStepQuestion } from './IStepQuestion';
import { ProjectFiles } from './tools/project/ProjectFiles';
import { ProjectInfo } from './tools/project/ProjectInfo';
import { ProjectPathAnalyser } from './tools/project/ProjectPathAnalyser';

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

// tslint:disable-next-line: interface-name
export interface Questions<T> {
  [key: string]: IStepQuestion<T>;
}

export type GeneratorOptions<T extends string> = Partial<TypeSaveProperty<Nested<T, string>>>;

export abstract class BaseGenerator<TStep extends string> extends generator.default {

  static counter: number = 0;

  readonly projectInfo: ProjectInfo;

  projectFiles: ProjectFiles;

  conflictedProjectFiles: ProjectFiles;

  generatorName: string;

  answers: TypeSaveProperty<Nested<TStep, string>>;

  questions: Nested<TStep, IStepQuestion<TStep>>;

  currentStep: TStep;

  constructor(args: string | string[], options: GeneratorOptions<TStep>) {
    super(args, options);

    this.projectInfo = new ProjectInfo();

    this.questions = <Nested<TStep, IStepQuestion<TStep>>>{};
    this.answers = <TypeSaveProperty<Nested<TStep, string>>>{};
    BaseGenerator.counter += 1;
    this.generatorName = this.constructor.name;
  }

  registerMethod(self: BaseGenerator<TStep>, method: MethodsToRegister<TStep>): void {
    // tslint:disable-next-line: no-unsafe-any
    self.constructor.prototype.prompting = this[method];
  }

  getDefaultProjectName(projectName: string): string {
    if (this.options.projectName) {
      return _.kebabCase();
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

  // tslint:disable-next-line: no-any
  writeOptionsToAnswers(propertyDescriptor: any): any {
    const options = Object
      // tslint:disable-next-line: no-unsafe-any
      .keys(propertyDescriptor)
      .map(x => <TStep>x);

    options.forEach(key => {
      if (this.options[key] !== undefined) {
        this.answers[key] = this.options[key];
      }
    });
  }

  validateString(value: string): boolean {
    if (value !== undefined && value.length > 0) {
      return true;
    } else {
      this.logRed(`${this.questions[this.currentStep].message} is required.`);

      return false;
    }
  }

  logGreen(message: string): void {
    this.log(chalk.green(message));
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
  abstract async initializing(): Promise<void>;

  /**
   * Where you prompt users for options(where you’d call this.prompt())
   */
  async prompting(): Promise<void> {
    if (this.currentStep === undefined) {
      throw new Error('Initial step not set');
    }
    do {
      // Do we have user input?
      let hasInput = false;

      // Set name to avoid writing the name twice on the definition
      this.questions[this.currentStep].name = this.currentStep;
      // Prompt
      const answer = await this.prompt(this.questions[this.currentStep]);
      // Store answer
      if (answer[this.currentStep] !== undefined) {
        hasInput = true;
        this.answers[this.currentStep] = answer[this.currentStep];
      }

      // Accept answer callback configured?
      if (hasInput && this.questions[this.currentStep].acceptAnswer !== undefined) {

        const accepted = await this.questions[this.currentStep].acceptAnswer(this.answers[this.currentStep]);

        // Should we ask again same step?
        if (accepted === true) {
          // Set next step
          this.currentStep = this.questions[this.currentStep].nextQuestion;
        }

      } else {

        // Set next step
        this.currentStep = this.questions[this.currentStep].nextQuestion;
      }

    } while (this.currentStep !== undefined);
  }

  /**
   * Saving configurations and configure the project(creating.editorconfig files and other metadata files)
   */
  abstract async configuring(): Promise<void>;

  loadTemplateFiles(): void {
    this.logYellow(`Analyse template files. (${this.generatorName})`);
    const x = new ProjectPathAnalyser((...args) => this.templatePath(...args));
    this.projectFiles = x.getProjectFiles(this.projectInfo);
  }

  copyTemplateFiles(): void {
    this.conflictedProjectFiles = new ProjectFiles(this.projectInfo);

    this.projectFiles.templateFiles.forEach(file => {

      if (this.fs.exists(this.destinationPath(file.targetPath))) {

        const ext = path.extname(file.filePath);

        switch (ext) {
          case '.ts':
            throw new Error(`Resolving conflicted ${ext} files not implemented.`);

          case '.json':
            const fileContent = fs.readFileSync(file.filePath, 'utf-8');
            const addJsonContent = JSON.parse(fileContent);
            this.fs.extendJSON(this.destinationPath(file.targetPath), addJsonContent);
            this.fs.copyTpl(this.destinationPath(file.targetPath), this.destinationPath(file.targetPath), this.answers);
            break;

          default:
            this.conflictedProjectFiles.templateFiles.push(file);
            throw new Error(`Could not resolve conflicted ${ext} files.`);

        }

      } else {
        this.fs.copy(file.filePath, this.destinationPath(file.targetPath));
      }
    });

  }

  /**
   * If the method name doesn’t match a priority, it will be pushed to this group.
   */
  // tslint:disable-next-line: no-reserved-keywords
  abstract async default(): Promise<void>;

  /**
   * Where you write the generator specific files(routes, controllers, etc)
   */
  abstract async writing(): Promise<void>;

  /**
   * Where conflicts are handled(used internally)
   */
  abstract async conflicts(): Promise<void>;

  async resolveConflicts(): Promise<void> {
    const conflicted = this.conflictedProjectFiles.templateFiles;

    conflicted.forEach(file => {
      const ext = path.extname(file.filePath);

      switch (ext) {
        case '.ts':
          throw new Error(`Resolving conflicted ${ext} files not implemented.`);

        case '.json':
          const fileContent = fs.readFileSync(file.filePath, 'utf-8');
          const addJsonContent = JSON.parse(fileContent);
          this.fs.extendJSON(this.destinationPath(file.targetPath), addJsonContent);
          break;

        default:
          throw new Error(`Could not resolve conflicted ${ext} files.`);

      }

    });
  }

  /**
   * Where installations are run(npm, bower)
   */
  abstract async install(): Promise<void>;

  /**
   * Called last, cleanup, say good bye, etc
   */
  abstract async end(): Promise<void>;

}
