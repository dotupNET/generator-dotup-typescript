import { BaseGenerator, GeneratorOptions } from 'dotup-typescript-yeoman-generators';
import { TsQuestions, TypescriptGenerator } from '../ts/TypescriptGenerator';
import { IProperty } from '../types';

export class TypescriptAppGenerator extends BaseGenerator<TsQuestions> {

  constructor(args: string | string[], options: GeneratorOptions<TsQuestions>) {
    super(args, options);
    this.registerMethod(this);
    this.writeOptionsToAnswers(TsQuestions);
  }

  async initializing(): Promise<void> {
    const opt = <IProperty>this.options;

    this.composeWith(
      <any>{
        Generator: TypescriptGenerator,
        path: require.resolve('../ts/index')
      },
      {
        [TsQuestions.projectName]: opt.projectName,
        [TsQuestions.sourcePath]: opt.sourcePath,
        [TsQuestions.targetPath]: opt.targetPath,
        [TsQuestions.testPath]: opt.testPath,
        [TsQuestions.docsPath]: opt.docsPath,
        [TsQuestions.mainFile]: opt.mainFile,
        [TsQuestions.typesFile]: opt.typesFile
      }
    );
  }

  async install(): Promise<void> {
  }

  async end(): Promise<void> {
  }

}
