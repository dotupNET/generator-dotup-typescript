import { BaseGenerator, GeneratorOptions, SharedOptions } from 'dotup-typescript-yeoman-generators';
import { TypescriptGenerator } from '../ts/TypescriptGenerator';
import { TsQuestions } from "../ts/TsQuestions";
import _ from 'lodash';

export class TypescriptLibGenerator extends BaseGenerator<TsQuestions> {

  constructor(args: string | string[], options: GeneratorOptions<TsQuestions>, sharedOptions?: SharedOptions<TsQuestions>) {
    super(args, options);
    this.registerMethod(this);
    this.writeOptionsToAnswers(TsQuestions);
  }

  async initializing(): Promise<void> {
    const opts = this.options;
    _.merge(opts, { 'sharedOptions': this.sharedOptions });
    this.composeWith(
      <any>{
        Generator: TypescriptGenerator,
        path: require.resolve('../ts/index')
      },
      opts
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
