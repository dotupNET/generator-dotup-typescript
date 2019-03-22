import { BaseGenerator, GeneratorOptions, InquirerQuestionType, ProjectType, StoreQuestion } from 'dotup-typescript-yeoman-generators';
import { TsQuestions } from '../ts/TsQuestions';
import { PartialTypescriptQuestions } from '../ts/TypescriptGenerator';

export class MyGenerator extends BaseGenerator<TsQuestions> {

  constructor(args: string | string[], options: GeneratorOptions<TsQuestions>) {
    super(args, options);
    super.registerMethod(this);
    this.writeOptionsToAnswers(TsQuestions);
  }

  async initializing(): Promise<void> {
    if (this.skipGenerator) { return; }

    const opt = <PartialTypescriptQuestions>this.options;

    // Your name
    this.addQuestion(
      new StoreQuestion(TsQuestions.projectType, {
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
