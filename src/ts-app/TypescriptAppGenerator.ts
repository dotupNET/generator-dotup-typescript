import { BaseGenerator, GeneratorOptions } from 'dotup-typescript-yeoman-generators';
import { TypescriptGenerator, PartialTypescriptQuestions } from '../ts/TypescriptGenerator';
import { TsQuestions } from "../ts/TsQuestions";

export class TypescriptAppGenerator extends BaseGenerator<TsQuestions> {

  constructor(args: string | string[], options: GeneratorOptions<TsQuestions>) {
    super(args, options);
    this.registerMethod(this);
    this.writeOptionsToAnswers(TsQuestions);
  }

  async initializing(): Promise<void> {
    // const opt = <PartialTypescriptQuestions>this.options;

    this.composeWith(
      <any>{
        Generator: TypescriptGenerator,
        path: require.resolve('../ts/index')
      },
      this.answers
      // {
      //   [TsQuestions.projectName]: opt.projectName,
      //   [TsQuestions.sourcePath]: opt.sourcePath,
      //   [TsQuestions.targetPath]: opt.targetPath,
      //   [TsQuestions.testPath]: opt.testPath,
      //   [TsQuestions.docsPath]: opt.docsPath,
      //   [TsQuestions.mainFile]: opt.mainFile,
      //   [TsQuestions.typesFile]: opt.typesFile
      // }
    );
  }

  async install(): Promise<void> {
  }

  async end(): Promise<void> {
  }

}
