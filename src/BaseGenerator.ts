import * as generator from 'yeoman-generator';
import { Question } from 'yeoman-generator';
import { TypeSaveProperty, Nested } from 'dotup-ts-types';
import { IStepQuestion } from './QuestionWithAnswer';

export interface Questions {
  [key: string]: Question;
}

export abstract class BaseGenerator<TStep extends string> extends generator.default {

  questions: Nested<TStep, IStepQuestion<TStep>>;

  isValid: () => boolean;

  currentStep: TStep;

  constructor(args: string | string[], options: {}) {

    super(args, options);
  }


  /**
   * Your initialization methods(checking current project state, getting configs, etc)
   */
  abstract initializing(): Promise<void>;

  /**
   * Where you prompt users for options(where you’d call this.prompt())
   */
  abstract prompting(): Promise<void>;

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
