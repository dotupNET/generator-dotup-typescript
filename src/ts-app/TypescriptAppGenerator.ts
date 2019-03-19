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
        [TsQuestions.projectName]: this.options.projectName
      }
    );

  }

  async install(): Promise<void> {
  }

  async end(): Promise<void> {
  }

}
