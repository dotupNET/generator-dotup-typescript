import { BaseGenerator, GeneratorOptions } from 'dotup-typescript-yeoman-generators';
import { TsQuestions, TypescriptGenerator } from '../ts/TypescriptGenerator';
import { IStringProperty } from '../types';

export class YeomanGeneratorGenerator extends BaseGenerator<TsQuestions> {

  constructor(args: string | string[], options: GeneratorOptions<TsQuestions>) {
    super(args, options);
    this.registerMethod(this);

    // Do not ejs this files
    this.addSkipEjsReplacement(`src\\app\\templates\\package.json`);

    const opt = <IStringProperty>this.options;

    if (!opt.projectName.startsWith('generator-')) {
      opt.projectName = `generator-${opt.projectName}`;
      // this.destinationRoot(opt.projectName);
    }

    this.writeOptionsToAnswers(TsQuestions);
    // TODO: Extendable enum..
    // tslint:disable-next-line: no-any
    (<any>this.answers).yoName = opt.projectName.replace('generator-', '');
  }

  async initializing(): Promise<void> {
    const opt = <IStringProperty>this.options;
    this.composeWith(
      {
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
