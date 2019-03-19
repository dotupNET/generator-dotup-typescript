
// tslint:disable-next-line: match-default-export-name
import validateNpmPackageNameTyped from 'validate-npm-package-name-typed';
import { OptionalQuestion, Question } from '../app/Question';
import { BaseGenerator, GeneratorOptions, InquirerQuestionType } from '../BaseGenerator';
import { TsQuestions, TypescriptGenerator } from '../ts/TypescriptGenerator';

export enum TsLibQuestions {
  projectName = 'projectName',
  invalidProjectName = 'invalidProjectName'
}

declare type mixed = GeneratorOptions<TsLibQuestions> & TsLibQuestions;

export class TypescriptLibGenerator extends BaseGenerator<TsLibQuestions> {

  constructor(args: string | string[], options: GeneratorOptions<TsQuestions>) {
    super(args, options);
    this.registerMethod(this);

  }

  async initializing(): Promise<void> {
    this.composeWith(
      {
        Generator: TypescriptGenerator,
        path: require.resolve('../ts/index')
      },
      {
        [TsQuestions.projectName]: this.options.projectName
      }
    );
  }

  async install(): Promise<void> {
  }

  async end(): Promise<void> {
  }

}
