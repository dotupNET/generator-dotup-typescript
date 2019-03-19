
// tslint:disable-next-line: match-default-export-name
import validateNpmPackageNameTyped from 'validate-npm-package-name-typed';
import { OptionalQuestion, Question } from '../app/Question';
import { BaseGenerator, GeneratorOptions, InquirerQuestionType } from '../BaseGenerator';
import { TsQuestions, TypescriptGenerator } from '../ts/TypescriptGenerator';

export class TypescriptLibGenerator extends BaseGenerator<TsQuestions> {

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
        [TsQuestions.projectName]: this.options.projectName,
        [TsQuestions.sourcePath]: 'src',
        [TsQuestions.targetPath]: 'dist',
        [TsQuestions.testPath]: 'test',
        [TsQuestions.docsPath]: 'docs',
        [TsQuestions.mainFile]: 'index.js',
        [TsQuestions.typesFile]: 'index.d.ts'
      }
    );
  }

  async install(): Promise<void> {
  }

  async end(): Promise<void> {
  }

}
