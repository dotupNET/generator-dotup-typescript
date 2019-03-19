import { BaseGenerator, GeneratorOptions } from '../BaseGenerator';
import { TsQuestions, TypescriptGenerator } from '../ts/TypescriptGenerator';

export class TypescriptAppGenerator extends BaseGenerator<TsQuestions> {

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
        [TsQuestions.mainFile]: 'app.js',
        [TsQuestions.typesFile]: 'app.d.ts'
      }
    );
  }

  async install(): Promise<void> {
  }

  async end(): Promise<void> {
  }

}
