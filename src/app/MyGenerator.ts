import { BaseGenerator, GeneratorOptions, InquirerQuestionType, ProjectType, SharedOptions, StoreQuestion, ConfirmQuestion, Question } from 'dotup-typescript-yeoman-generators';
import { TsQuestions } from '../ts/TsQuestions';
import { PartialTypescriptQuestions } from '../ts/TypescriptGenerator';
import { TypescriptLibGenerator } from '../ts-lib/TypescriptLibGenerator';
import { TypescriptAppGenerator } from '../ts-app/TypescriptAppGenerator';
import _ from 'lodash';

export class MyGenerator extends BaseGenerator<TsQuestions> {


  constructor(args: string | string[], options: GeneratorOptions<TsQuestions>) {
    super(args, _.merge(options, { 'sharedOptions': new SharedOptions() }));
    super.registerMethod(this);
    this.writeOptionsToAnswers(TsQuestions);
  }

  async initializing(): Promise<void> {
    if (this.skipGenerator) { return; }

    const opt = <PartialTypescriptQuestions>this.options;

    // Project type
    this.addQuestion(
      new Question(TsQuestions.projectType, {
        message: `Project type?`,
        type: InquirerQuestionType.list,
        choices: [
          {
            name: 'Node application (Typescript)',
            value: ProjectType.app
          },
          {
            name: 'Node library (Typescript)',
            value: ProjectType.lib
          }
        ],
        When: a => opt.projectType === undefined

      })
    );

    // // Use github?
    // this.addQuestion(
    //   new ConfirmQuestion(TsQuestions.useGit, 'Configure git?')
    // );

  }

  async prompting(): Promise<void> {
    if (this.skipGenerator) { return; }

    await super.prompting();

    this.compose('generator-dotup-npm-package/generators/app');

    // Application type generator
    switch (this.answers.projectType) {

      case ProjectType.app:

        this.composeWith(
          <any>{
            Generator: TypescriptAppGenerator,
            path: require.resolve('../ts-app/index')
          },
          {
            // [TsQuestions.projectName]: this.sharedOptions.getAnswer(TsQuestions.projectName),
            'sharedOptions': this.sharedOptions,
            [TsQuestions.sourcePath]: 'src',
            [TsQuestions.targetPath]: 'dist',
            [TsQuestions.testPath]: 'test',
            [TsQuestions.docsPath]: 'docs',
            [TsQuestions.mainFile]: 'app.js',
            [TsQuestions.typesFile]: 'app.d.ts'
          }
        );

        break;

      case ProjectType.lib:

        this.composeWith(
          <any>{
            Generator: TypescriptLibGenerator,
            path: require.resolve('../ts-lib/index')
          },
          {
            // [TsQuestions.projectName]: this.answers.projectName,
            'sharedOptions': this.sharedOptions,
            [TsQuestions.sourcePath]: 'src',
            [TsQuestions.targetPath]: 'dist',
            [TsQuestions.testPath]: 'test',
            [TsQuestions.docsPath]: 'docs',
            [TsQuestions.mainFile]: 'index.js',
            [TsQuestions.typesFile]: 'index.d.ts'
          }
        );

        break;

      // case ProjectType.ts_yo_generator:

      //   this.composeWith(
      //     <any>{
      //       Generator: YeomanGeneratorGenerator,
      //       path: require.resolve('../ts-yogen/index')
      //     },
      //     {
      //       [TsQuestions.projectName]: this.answers.projectName,
      //       [TsQuestions.sourcePath]: 'src',
      //       [TsQuestions.targetPath]: 'generators',
      //       [TsQuestions.testPath]: 'test',
      //       [TsQuestions.docsPath]: 'docs',
      //       [TsQuestions.mainFile]: 'app/index.js',
      //       [TsQuestions.typesFile]: 'app/index.d.ts'
      //     }
      //   );

      //   break;

      default:
        throw new Error('Project type not implemented');
    }

  }

  async configuring(): Promise<void> {
    if (this.skipGenerator) { return; }

  }

  async install(): Promise<void> {
    if (this.skipGenerator) { return; }
  }

  async end(): Promise<void> {
    if (this.skipGenerator) { return; }
  }

}
