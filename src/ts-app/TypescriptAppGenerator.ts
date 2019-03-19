import { BaseGenerator, GeneratorOptions } from 'dotup-typescript-yeoman-generators';
import { TsQuestions, TypescriptGenerator } from '../ts/TypescriptGenerator';

export class TypescriptAppGenerator extends BaseGenerator<TsQuestions> {

  constructor(args: string | string[], options: GeneratorOptions<TsQuestions>) {
    super(args, options);
    this.registerMethod(this);
    this.writeOptionsToAnswers(TsQuestions);
  }

  async initializing(): Promise<void> {
    this.composeWith(
      {
        Generator: TypescriptGenerator,
        path: require.resolve('../ts/index')
      },
      {
        [TsQuestions.projectName]: this.options.projectName,
        [TsQuestions.sourcePath]: this.options.sourcePath,
        [TsQuestions.targetPath]: this.options.targetPath,
        [TsQuestions.testPath]: this.options.testPath,
        [TsQuestions.docsPath]: this.options.docsPath,
        [TsQuestions.mainFile]: this.options.mainFile,
        [TsQuestions.typesFile]: this.options.typesFile
      }
    );
  }

  async install(): Promise<void> {
  }

  async end(): Promise<void> {
  }

}
