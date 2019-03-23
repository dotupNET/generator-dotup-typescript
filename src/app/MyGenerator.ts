import { BaseGenerator, GeneratorOptions, SharedOptions, Question, InquirerQuestionType } from 'dotup-typescript-yeoman-generators';
import _ from 'lodash';
import { TypescriptGenerator } from '../ts/TypescriptGenerator';
import { TypescriptQuestions } from '../ts/TypescriptQuestions';
import validateNpmPackageNameTyped from 'validate-npm-package-name-typed';
import { ProjectQuestions } from 'generator-dotup-npm-package/generators/app/ProjectQuestions';

export class MyGenerator extends BaseGenerator<ProjectQuestions> {


  constructor(args: string | string[], options: GeneratorOptions<ProjectQuestions>) {
    super(args, _.merge(options, { 'sharedOptions': new SharedOptions() }));
    super.registerMethod(this);
    this.writeOptionsToAnswers(ProjectQuestions);
  }

  async initializing(): Promise<void>{

    // Project name
    this.addQuestion(
      new Question(ProjectQuestions.projectName, {
        message: 'Project Name',
        type: InquirerQuestionType.input,
        default: this.getDefaultProjectName(),
        validate: (v: string) => this.validateString(v),
        acceptAnswer: v => {
          const accept = validateNpmPackageNameTyped(v.toString()).validForNewPackages;
          if (!accept) {
            this.logRed(`${v} is not a valid package name.`);
          }

          return true;
        },
        When: _ => this.tryGetAnswer(ProjectQuestions.projectName) === undefined
      })
    );

    // Invalid project name
    this.addQuestion(
      new Question(ProjectQuestions.invalidProjectName, {
        message: 'Continue anyway?',
        type: InquirerQuestionType.confirm,
        default: 'N',
        acceptAnswer: accepted => {

          if (!accepted) {
            // Ask again for the project name
            this.currentStep = ProjectQuestions.projectName;
          }

          return accepted;
        },
        When: () => {
          const name = this.tryGetAnswer(ProjectQuestions.projectName);
          return !validateNpmPackageNameTyped(name).validForNewPackages;
        }
      })
    );

    // Create folder?
    this.addQuestion(
      new Question(ProjectQuestions.createFolder, {
        type: InquirerQuestionType.confirm,
        message: () => `Create folder '${this.answers.projectName}' ?`,
        default: 'Y',
        When: () => !this.destinationIsProjectFolder(this.answers.projectName),
        acceptAnswer: accepted => {
          if (accepted) {
            // Create new root
            this.destinationRoot(this.destinationPath(this.answers.projectName));
            this.logGreen(`Destination path changed to ${this.destinationPath()}`);
          }

          return accepted;
        }
      })
    );

  }
  async prompting(): Promise<void> {
    if (this.skipGenerator) { return; }

    await super.prompting();

    this.compose('generator-dotup-npm-package/generators/app');

    // Typescript generator
    this.composeWith(
      <any>{
        Generator: TypescriptGenerator,
        path: require.resolve('../ts/index')
      },
      {
        [TypescriptQuestions.sourcePath]: 'src',
        [TypescriptQuestions.targetPath]: 'dist',
        [TypescriptQuestions.testPath]: 'test',
        [TypescriptQuestions.docsPath]: 'docs'
      }
    );


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

  }

}
